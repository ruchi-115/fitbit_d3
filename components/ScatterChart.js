// components/ScatterPlot.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const margin = { top: 20, right: 20, bottom: 50, left: 60 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Clear previous content
        svg.selectAll("*").remove();

        const g = svg
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // X and Y scales
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.TotalSteps) * 1.1])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.Calories) * 1.1])
            .range([height, 0]);

        // Add X and Y axes
        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .append('text')
            .attr('x', width / 2)
            .attr('y', 40)
            .attr('fill', '#000')
            .style('text-anchor', 'middle')
            .text('Total Steps');

        g.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y))
            .append('text')
            .attr('x', -150)
            .attr('y', -50)
            .attr('fill', '#000')
            .style('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text('Calories');

        // Add scatter points
        g.selectAll('.dot')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('r', 5)
            .attr('cx', d => x(d.TotalSteps))
            .attr('cy', d => y(d.Calories))
            .style('fill', 'steelblue');

    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default ScatterPlot;
