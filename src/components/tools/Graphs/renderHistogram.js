import * as d3 from "d3";

const renderHistogram = (data, height, width) => {
  const margin = {
    left: 30,
    right: 10,
    bottom: 40,
    top: 20,
  };

  // const brush = d3
  //   .brushX()
  //   .extent([
  //     [margin.left, 0.5],
  //     [width - margin.right, height - margin.bottom + 0.5],
  //   ])
  //   .on("start brush end", () => console.log(12)); //brush not working!

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.radius))
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.frequency)])
    .range([height - margin.bottom, margin.top]);

  const graph = d3
    .select("#histogram-graph-svg")
    .attr("height", height)
    .attr("width", width)
    // .call(brush)
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("fill", "var(--primary")
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(0) - y(d.frequency))
    .attr("y", (d) => y(d.frequency))
    .attr("x", (d) => x(d.radius))
    .attr("data-tooltip", (d) => `Radius: ${d.radius}, Count: ${d.frequency}`);

  d3.select("#histogram-graph-y-lable")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 20))
    .call((g) => g.select(".domain").remove())
    .select("text")
    .attr("x", 10)
    .attr("y", 23 - height)
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .text("↑ Number of radii");

  d3.select("#histogram-graph-x-lable")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickValues(x.domain().filter((d, i) => !(i % 10))))
    .call((g) => g.select(".domain").remove())
    .select("text")
    .attr("y", margin.bottom - 10)
    .attr("x", margin.left)
    .attr("text-anchor", "start")
    .text("Radius size →")
    .attr("font-size", 10)
    .attr("fill", "currentColor");
};
export default renderHistogram;
