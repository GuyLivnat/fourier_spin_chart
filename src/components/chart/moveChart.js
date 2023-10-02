import * as d3 from "d3";

const moveChart = (panX, panY, zoom) => {
    const minStroke = zoom.current/chart.clientWidth;


    d3.select("#chart")
    .attr("viewBox", `${panX.current} ${panY.current} ${zoom.current} ${zoom.current * 0.5625}`)
    .select("#chart-shapes")
        .attr("transform", `translate(${zoom.current/2}, ${zoom.current/2})`)

    d3.select("#edge").style("stroke-width", () => minStroke*2.5);
    d3.select("#radii").style("stroke-width", () => minStroke*2);
    d3.select("#circles").style("stroke-width", () => minStroke);

}


export default moveChart;