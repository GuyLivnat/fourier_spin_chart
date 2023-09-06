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

    d3.select("#circles")
        .selectAll("path")
        .data(data.circles)
        .join("path")
            .attr("d", orbit)
            .attr("marker-start", "url(#star)")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .attr("opacity", (d, i) => {
                if (d.r < 4) return 0
                 return 1/data.circles.length*i/10 + 0.3
            });


    d3.select("#radii")
        .selectAll("path")
        .data(data.circles)
        .join("path")
            .attr("d", line(data.circles))
            .style("fill", "none")

    d3.select("#edgeFirst")
        .attr("d", line(edge.first));
        
    d3.select("#edgeSecond")
        .attr("d", line(edge.second));

    d3.select("#edgeThird")
        .attr("d", line(edge.third));

    d3.select("#edgeFourth")
        .attr("d", line(edge.fourth));

    d3.select("#edgeFifth")
        .attr("d", line(edge.fifth));
};

export default StarChart;