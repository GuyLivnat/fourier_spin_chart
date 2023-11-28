import * as d3 from "d3";

const renderFilters = (data, height, width) => {
  const barWidth = width / data.length;

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height]);

  const x = d3.scaleBand().domain(d3.range(data.length)).range([0, width]);

  d3.select("#filters-svg")
    .attr("height", height)
    .attr("width", x.range()[1])
    .attr("font-family", "sans-serif")
    .attr("font-size", barWidth)
    .attr("text-anchor", "end");

  const groups = d3
    .select("#filter-bars-group")
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d, i) => `translate(${x(i)},0)`);

  groups
    .select("rect")
    // .attr("y", height-y)
    .attr("fill", "var(--primary")
    .attr("height", y)
    .attr("width", x.bandwidth());

  //   groups
  //     .select("text")
  //     .attr("fill", "white")
  //     .attr("x", (d) => x(d) - 3)
  //     .attr("y", y.bandwidth() / 2)
  //     .attr("dy", "0.35em")
  //     .text((d) => d.toFixed(1));

  //   console.log("rendered filters");
};
export default renderFilters;
