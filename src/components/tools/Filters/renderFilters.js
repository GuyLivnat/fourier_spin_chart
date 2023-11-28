import * as d3 from "d3";

const renderFilters = (data, width) => {
  const barWidth = 5;

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);

  const y = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([0, barWidth * data.length]);

  d3.select("#filters-svg")
    .attr("width", width)
    .attr("height", y.range()[1])
    .attr("font-family", "sans-serif")
    .attr("font-size", barWidth)
    .attr("text-anchor", "end");

  const groups = d3
    .select("#filters-svg")
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d, i) => `translate(0,${y(i)})`);

  groups
    .select("rect")
    .attr("fill", "steelblue")
    .attr("width", x)
    .attr("height", y.bandwidth());

  groups
    .select("text")
    .attr("fill", "white")
    .attr("x", (d) => x(d) - 3)
    .attr("y", y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text((d) => d.toFixed(1));

  console.log("filters rendered");
};
export default renderFilters;
