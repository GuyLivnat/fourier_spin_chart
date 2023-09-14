import * as d3 from "d3";


const runChart = (data, edge, lineSegments, units, zoom, coeffLength) => {
    
    const segment = units/lineSegments;
    const chart = document.getElementById("chart");
    const scalingMin = chart ? zoom/chart.clientWidth*15 : 2;
    const minircle = (zoom/150 > scalingMin)? zoom/150 : scalingMin; 
    const filteredData = data.circles.filter((circle, i) => {if(circle.r > minircle || i === (coeffLength/2-1)) return circle})

    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

    const orbit = d3.arc()
        .innerRadius(d => d.r)
        .outerRadius(d => d.r)
        .startAngle(d => d.angle - 1.5*Math.PI)
        .endAngle(d => d.angle - 4*Math.PI);
    
    for (let i = 0; i < units; i++) {
        let thisCircle = filteredData[i];
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
        .attr("d", line(filteredData));

    for (let i=0; i<lineSegments; i++) {
        let start = ((i === 0 || (i === 1))) ? 0 : (segment*(i-1))-1;
        let end = segment*(i+1);
        d3.select(`#edge_${i}`)
        .attr("d", line(edge.slice(start, end)));
    }
};

export default runChart;