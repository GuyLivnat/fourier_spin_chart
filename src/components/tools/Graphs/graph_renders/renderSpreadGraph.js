import * as d3 from "d3";

const renderSpreadGraph = (data, height, width) => {
  const marginLeft = 40;
  const marginRight = 10;
  const marginBottom = 16;
  const marginTop = 20;
  const barWidth = width / data.length;

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - marginBottom, marginTop]);

  const empty = d3.scaleLinear().domain([0, 0]).range([0, 0]);

  d3.select("#spread-graph-svg")
    .attr("height", height)
    .attr("width", width)

    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("fill", "var(--primary")
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(0) - y(d))
    .attr("y", (d) => y(d))
    .attr("x", (d, i) => x(i));

  d3.select("#spread-graph-y-lable")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 20))
    .call((g) => g.select(".domain").remove())
    .select("text")
    .attr("x", 10)
    .attr("y", 23 - height)
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .text("↑ Radius size");

  d3.select("#spread-graph-x-lable")
    .attr("transform", `translate(0, ${height - marginBottom})`)
    // .call(d3.axisBottom(empty))
    .select("text")
    .attr("fill", "currentColor")
    .attr("y", marginBottom / 1.5)
    .attr("x", marginLeft)
    .attr("text-anchor", "start")
    .attr("font-size", 10)
    .text("Place in chain →");
};
export default renderSpreadGraph;
