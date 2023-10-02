import * as d3 from "d3";


const renderChart = (frame, edge, lineSegments, units, zoom, coeffLength) => {
    
    const segment = units/lineSegments;
    const chart = document.getElementById("chart");
    const scalingMin = zoom/chart.clientWidth*15;
    const minircle = (zoom/150 > scalingMin)? zoom/150 : scalingMin; 
    const filteredFrame = frame.circles.filter((circle, i) => {if(circle.r > minircle || (i === (coeffLength/2-1) && coeffLength > 2)) return circle})

    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
    
    for (let i = 0; i < units; i++) {
        let thisCircle = filteredFrame[i];
        if (thisCircle) {
            d3.select(`#circle_${i}`)
                .attr("cx", thisCircle.x)
                .attr("cy", thisCircle.y)
                .attr("r", thisCircle.r)
        } else { //circles that are left behind from the zoom or image changing while offscreen need to be hidden
            d3.select(`#circle_${i}`)
            .attr("r", 0)
        }
    };


    d3.select("#radii")
        .attr("d", line(filteredFrame));

    for (let i=0; i<lineSegments; i++) {
        let start = ((i === 0 || i === 1)) ? 0 : (segment*(i-1))-1;
        let end = segment*(i+1);
        d3.select(`#edge_${i}`)
        .attr("d", line(edge.slice(start, end)))
    }
};

export default renderChart;