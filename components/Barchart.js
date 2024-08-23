import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export default function BarChart({ data }) {
    const ref = useRef();

    useEffect(() => {
        if (data && data.length > 0) {
            // Map the days of the week to labels
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            // Aggregate data by weekdays and calculate average steps
            const aggregatedData = d3.rollups(
                data,
                v => d3.mean(v, d => d.TotalSteps),
                d => daysOfWeek[new Date(d.ActivityDate).getDay()] // Group by day of the week
            );

            const avgStepsData = daysOfWeek.map(day => {
                const dayData = aggregatedData.find(d => d[0] === day);
                return {
                    day,
                    avgSteps: dayData ? dayData[1] : 0
                };
            });

            // Set up SVG dimensions
            const width = 600;
            const height = 400;
            const margin = { top: 20, right: 30, bottom: 50, left: 60 };

            const svg = d3.select(ref.current)
                .attr('width', width)
                .attr('height', height);

            // Set up scales
            const xScale = d3.scaleBand()
                .domain(daysOfWeek)
                .range([margin.left, width - margin.right])
                .padding(0.1);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(avgStepsData, d => d.avgSteps)])
                .nice()
                .range([height - margin.bottom, margin.top]);

            // Create axes
            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);

            svg.append('g')
                .attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(xAxis)
                .selectAll('text')
                .attr('transform', 'translate(-10,10)rotate(-45)')
                .style('text-anchor', 'end');

            svg.append('g')
                .attr('transform', `translate(${margin.left}, 0)`)
                .call(yAxis);

            // Create bars
            svg.selectAll('.bar')
                .data(avgStepsData)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr('x', d => xScale(d.day))
                .attr('y', d => yScale(d.avgSteps))
                .attr('width', xScale.bandwidth())
                .attr('height', d => height - margin.bottom - yScale(d.avgSteps))
                .attr('fill', 'steelblue');

            // Add labels to bars
            svg.selectAll('.label')
                .data(avgStepsData)
                .enter().append('text')
                .attr('class', 'label')
                .attr('x', d => xScale(d.day) + xScale.bandwidth() / 2)
                .attr('y', d => yScale(d.avgSteps) - 5)
                .attr('text-anchor', 'middle')
                .style('font-size', '12px')
                .style('fill', 'black')
        }
    }, [data]);

    return (
        <svg ref={ref}></svg>
    );
}
