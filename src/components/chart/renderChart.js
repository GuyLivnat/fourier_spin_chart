import * as d3 from "d3";

const renderChart = (
  frame,
  outline,
  lineSegments,
  zoom,
  panX,
  panY,
  coeff,
  length,
  amountOfCircles
) => {
  const segment = length / lineSegments;
  const chart = document.getElementById("chart");

  const minStroke = zoom / chart.clientWidth;
  const scalingMin = (zoom / chart.clientWidth) * 15;
  const minircle = zoom / 150 > scalingMin ? zoom / 150 : scalingMin;
  const filteredFrame = frame.circles.filter((circle, i) => {
    if (circle.r > minircle || i === coeff.length) return circle;
  });

  const line = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  for (let i = 0; i < amountOfCircles; i++) {
    let thisCircle = filteredFrame[i];
    if (thisCircle) {
      d3.select(`#circle_${i}`)
        .attr("cx", thisCircle.x)
        .attr("cy", thisCircle.y)
        .attr("r", thisCircle.r);
    } else {
      //circles that are left behind from the zoom or image changing while offscreen need to be hidden
      d3.select(`#circle_${i}`).attr("r", 0);
    }
  }
  d3.select("#circles").style("stroke-width", minStroke);

  d3.select("#chart")
    .attr("viewBox", `${panX} ${panY} ${zoom} ${zoom * 0.5625}`)
    .select("#chart-shapes")
    .attr("transform", `translate(${zoom / 2}, ${zoom / 2})`);

  d3.select("#radii")
    .attr("d", line(filteredFrame))
    .style("stroke-width", minStroke * 2);

  d3.select("#outline").style("stroke-width", minStroke * 2.5);

  for (let i = 0; i < lineSegments + 1; i++) {
    let start = i === 0 || i === 1 ? 0 : segment * (i - 1) - 1;
    let end = segment * (i + 1);
    d3.select(`#outline-${i}`).attr("d", line(outline.slice(start, end)));
  }
};

export default renderChart;
