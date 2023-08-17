import React, {Component} from 'react';
import * as d3 from "d3";
import PlayPauseButton from '../PlayPauseBtn';


class StarChart extends Component {

    componentDidMount() { 
        this.drawChart();
        console.log('starchart mounted')
    };

    drawChart() {
        console.log('starchar is drawn')
        const width = this.props.width;
        const height = this.props.height;
        const starSize = this.props.starSize;

        const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

        const orbit = d3.arc()
        .innerRadius(d => d.r)
        .outerRadius(d => d.r)
        .startAngle(d => d.angle - 1.5*Math.PI)
        .endAngle(d => d.angle - 4*Math.PI)

        const svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .style("background-color", "black")

        // const connections = svg.append("g")
        //   .attr("stroke", "red")
        //   .attr("stroke-dasharray", 2)
        //   .selectAll("path")
        //   .data(frame)
        //   .join("path")
        //     .attr("d", line(frame))
        //     .style("fill", "none")

        const defs = svg.append("defs")

        // const starTrail = defs.append("pattern")
        //   .attr("viewbox", [25, 25, 75, 75])
        //   .attr("id", "starTrail")
        //   .attr("width", "150%")
        //   .attr("height", "150%")
        //   .attr("x", -0.1)
        //   .attr("y", -0.1)
        //   .append("image")
        //     .attr("href", "gradient3")
        //     .attr("x", 5)
        //     .attr("y", 5)
        //     .attr("width", 100)
        //     .attr("height", 100)

        const star = defs.append("marker")
        .attr("id", "star")
        .attr("orient", "auto")
        .attr("markerWidth", starSize*2)
        .attr("markerHeight", starSize*2)
        .attr("refX", starSize)
        .attr("refY", starSize)
        .append("circle")
            .attr("r", starSize)
            .attr("cx", starSize)
            .attr("cy", starSize)
            .attr("fill", "white")

        const orbits = svg.append("g")
        // .attr("stroke", "url(#starTrail)")
        .attr("stroke", "white")
        .selectAll("path")
        .data(this.props.orbitState)
        .join("path")
            .attr("d", orbit)
            .attr("marker-start", "url(#star)")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .attr("opacity", (d, i) => 1/this.props.orbitState.length * i)

        // const edge = svg.append("path")
        // .attr("stroke", "white")
        // .style("fill", "none")
        // .style("stroke-width", 2)
        // .attr("d", line(edgeState))
        // .attr("marker-end", "url(#star)")
        // .attr("mix-blend-mode", "hard-light")
        
    }
    render() {
        return <PlayPauseButton/>
    }
};

export default StarChart;