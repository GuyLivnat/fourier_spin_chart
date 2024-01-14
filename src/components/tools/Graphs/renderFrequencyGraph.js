import * as d3 from "d3";

const renderFrequencyGraph = (data, height, width, margin) => {
  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - margin.bottom, margin.top]);

  d3.select("#frequency-graph-screen-rect")
    .attr("height", height - margin.top - margin.bottom)
    .attr("y", margin.top)
    .attr("fill", "var(--half-primary)");

  d3.select("#frequency-graph-svg")
    .attr("height", height)
    .attr("width", width)
    .select("#frequency-graph-rect-group")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("fill", "var(--primary)")
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(0) - y(d))
    .attr("y", (d) => y(d))
    .attr("x", (d, i) => x(i))
    .attr("data-tooltip", (d, i) => `Radius: ${d.toFixed(2)}, Frequency: ${i}`);

  d3.select("#frequency-graph-y-lable")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 20))
    .call((g) => g.select(".domain").remove())
    .select("text")
    .attr("x", -8)
    .attr("y", 23 - height)
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .text("↑ Radius size");

  d3.select("#frequency-graph-x-lable")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .select("text")
    .attr("fill", "currentColor")
    .attr("y", margin.bottom / 1.5)
    .attr("x", margin.left)
    .attr("text-anchor", "start")
    .attr("font-size", 10)
    .text("Frequency →");
};
export default renderFrequencyGraph;
