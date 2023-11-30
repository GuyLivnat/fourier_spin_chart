import * as d3 from "d3";

const renderFrequencyGraph = (data, height, width) => {
  const marginLeft = 40;
  const marginRight = 10;
  const marginBottom = 30;
  const marginTop = 20;
  const barWidth = width / data.length;

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.radius))
    .range([marginLeft, width - marginRight])
    .paddingInner(barWidth / 100);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.frequency)])
    .range([height - marginBottom, marginTop]);

  d3.select("#frequency-graph-svg")
    .attr("height", height)
    .attr("width", width)

    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("fill", "var(--primary")
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(0) - y(d.frequency))
    .attr("y", (d) => y(d.frequency))
    .attr("x", (d) => x(d.radius));

  d3.select("#frequency-graph-y-lable")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 20))
    .call((g) => g.select(".domain").remove())
    .select("text")
    .attr("x", 10)
    .attr("y", 40 - height)
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .text("↑ Number of radii");

  d3.select("#frequency-graph-x-lable")
    .attr("transform", `translate(0, ${height - marginBottom})`)
    .call(d3.axisBottom(x))
    .call((g) => g.select(".domain").remove())
    .select("text")
    .attr("y", 20)
    .attr("x", 0)
    .attr("text-anchor", "start")
    .text("Radius size →");
};
export default renderFrequencyGraph;
