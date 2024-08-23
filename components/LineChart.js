import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export default function LineChart({ data }) {
    const ref = useRef();

    useEffect(() => {
        if (data && data.length > 0) {
            // Map the days of the week to labels
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            // Aggregate data by weekdays and calculate average active time
            const aggregatedData = d3.rollups(
                data,
                v => ({
                    avgActiveTime: d3.mean(v, d => d.VeryActiveMinutes + d.FairlyActiveMinutes + d.LightlyActiveMinutes),
                }),
                d => daysOfWeek[new Date(d.ActivityDate).getDay()]
            );

            const avgActiveData = daysOfWeek.map(day => {
                const dayData = aggregatedData.find(d => d[0] === day);
                return {
                    day,
                    avgActiveTime: dayData ? dayData[1].avgActiveTime : 0
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
            const xScale = d3.scalePoint()
                .domain(daysOfWeek)
                .range([margin.left, width - margin.right]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(avgActiveData, d => d.avgActiveTime)])
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

            // Create the line generator
            const line = d3.line()
                .x(d => xScale(d.day))
                .y(d => yScale(d.avgActiveTime))
                .curve(d3.curveMonotoneX);

            // Append the line path
            svg.append('path')
                .datum(avgActiveData)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 2)
                .attr('d', line);

            // Add circles to each data point
            svg.selectAll('.dot')
                .data(avgActiveData)
                .enter().append('circle')
                .attr('class', 'dot')
                .attr('cx', d => xScale(d.day))
                .attr('cy', d => yScale(d.avgActiveTime))
                .attr('r', 4)
                .attr('fill', 'steelblue');

            // Add labels to each data point
            svg.selectAll('.label')
                .data(avgActiveData)
                .enter().append('text')
                .attr('class', 'label')
                .attr('x', d => xScale(d.day))
                .attr('y', d => yScale(d.avgActiveTime) - 10)
                .attr('text-anchor', 'middle')
                .style('font-size', '12px')
                .style('fill', 'black')
                .text(d => d.avgActiveTime.toFixed(1));
        }
    }, [data]);

    return (
        <svg ref={ref}></svg>
    );
}
