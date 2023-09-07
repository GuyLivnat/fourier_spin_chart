import * as d3 from "d3";


const StarChart = ({data, edge, lineSegments, units}) => {
    const segment = units/lineSegments;

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
                return 0.3
            });

    d3.select("#radii")
        .selectAll("path")
        .data(data.circles)
        .join("path")
            .attr("d", line(data.circles));

    for (let i=0; i<lineSegments; i++) {
        let start = (segment*(i-1))-1;
        let end = segment*(i+1);
        if ((i === 0 || (i === 1))) start = 0;
        d3.select(`#edge_${i}`)
        .attr("d", line(edge.slice(start, end)));
    }
};

export default StarChart;