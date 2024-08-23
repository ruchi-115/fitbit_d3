import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export default function PieChart({ data }) {
    const ref = useRef();

    useEffect(() => {
        if (data && data.length > 0) {
            // Calculate total active minutes and percentages
            const totalActiveMinutes = d3.sum(data, d => d.VeryActiveMinutes + d.FairlyActiveMinutes + d.LightlyActiveMinutes + d.SedentaryMinutes);

            const activityData = [
                { label: 'Very Active', value: d3.sum(data, d => d.VeryActiveMinutes) },
                { label: 'Fairly Active', value: d3.sum(data, d => d.FairlyActiveMinutes) },
                { label: 'Lightly Active', value: d3.sum(data, d => d.LightlyActiveMinutes) },
                { label: 'Sedentary', value: d3.sum(data, d => d.SedentaryMinutes) }
            ];

            const activityPercentages = activityData.map(d => ({
                label: d.label,
                value: d.value,
                percentage: ((d.value / totalActiveMinutes) * 100).toFixed(2)
            }));

            // Set up SVG dimensions and pie chart configuration
            const width = 600;
            const height = 400;
            const margin = { top: 20, right: 150, bottom: 20, left: 20 };
            const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2 - 20;

            const svg = d3.select(ref.current)
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${(width - margin.right) / 2}, ${height / 2})`);

            const pie = d3.pie().value(d => d.value);

            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

            const outerArc = d3.arc()
                .innerRadius(radius * 1.1)
                .outerRadius(radius * 1.1);

            const color = d3.scaleOrdinal()
                .domain(activityPercentages.map(d => d.label))
                .range(d3.schemeDark2);

            const pieData = pie(activityPercentages);

            // Render pie chart slices
            svg.selectAll('path')
                .data(pieData)
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', d => color(d.data.label))
                .attr('stroke', 'white')
                .attr('stroke-width', '2px');

            // Render labels outside the pie chart
            svg.selectAll('polyline')
                .data(pieData)
                .enter()
                .append('polyline')
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
                .attr('fill', 'none')
                .attr('points', d => {
                    const posA = arc.centroid(d);
                    const posB = outerArc.centroid(d);
                    const posC = outerArc.centroid(d);
                    posC[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
                    return [posA, posB, posC];
                });

            svg.selectAll('text')
                .data(pieData)
                .enter()
                .append('text')
                .text(d => `${d.data.percentage}%`)
                .attr('transform', d => {
                    const pos = outerArc.centroid(d);
                    pos[0] = radius * (midAngle(d) < Math.PI ? 1.2 : -1.2);
                    return `translate(${pos})`;
                })
                .style('text-anchor', d => (midAngle(d) < Math.PI ? 'start' : 'end'))
                .style('font-size', '12px');

            // Helper function to calculate the mid-angle of each slice
            function midAngle(d) {
                return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }

            // Add legend in the right corner
            const legend = svg.append('g')
                .attr('transform', `translate(${radius + 20}, ${-radius})`);

            legend.selectAll('rect')
                .data(pieData)
                .enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', (d, i) => i * 20)
                .attr('width', 18)
                .attr('height', 18)
                .attr('fill', d => color(d.data.label));

            legend.selectAll('text')
                .data(pieData)
                .enter()
                .append('text')
                .attr('x', 24)
                .attr('y', (d, i) => i * 20 + 9)
                .attr('dy', '0.35em')
                .text(d => d.data.label)
                .style('font-size', '12px')
                .style('text-anchor', 'start');
        }
    }, [data]);

    return (
        <svg ref={ref} style={{ padding: '20px' }}></svg>
    );
}
