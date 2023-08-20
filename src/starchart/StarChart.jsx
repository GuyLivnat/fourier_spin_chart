import * as d3 from "d3";



const StarChart = ({data, edge}) => {

    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

    const orbit = d3.arc()
        .innerRadius(d => d.r)
        .outerRadius(d => d.r)
        .startAngle(d => d.angle - 1.5*Math.PI)
        .endAngle(d => d.angle - 4*Math.PI);

    const orbits = d3.select("#orbits")
    // .attr("stroke", "url(#starTrail)")
        .selectAll("path")
        .data(data.orbits)
        .join("path")
            .attr("d", orbit)
            .attr("marker-start", "url(#star)")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .attr("opacity", (d, i) => 1/data.orbits.length * i);


    const edgeStoke = d3.select("#edge")
    
        .attr("path", () => ("d", line(edge)))
        // .attr("d", line(edge));
};

export default StarChart;