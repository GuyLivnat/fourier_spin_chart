import { useContext, useEffect, useState } from "react";
import renderFrequencyGraph from "./renderFrequencyGraph";
import BarGraphInit from "./BarGraphInit";
import renderHistogram from "./renderHistogram";
import CollapseTitle from "../../general_components/CollapseTitle";
import { CoeffContext } from "../../../contexts/CoeffContext";

const Graphs = () => {
  const { coeff, activeId } = useContext(CoeffContext);

  const height = 200;
  const graphs = document.getElementById("graphs");
  const width = graphs ? graphs.clientWidth : 0;

  const [flag, updateFilters] = useState(true);

  const radii = coeff.current.map((circle) => circle.r);

  const histogram = {};

  for (let i = 0; i < radii.length; i++) {
    const radius = Math.round(radii[i]);
    if (!histogram[radius]) histogram[radius] = 1;
    else histogram[radius] += 1;
  }

  const frequencys = [];

  for (const [radius, frequency] of Object.entries(histogram)) {
    frequencys.push({ radius: parseInt(radius), frequency: frequency });
  }

  const renderGraphs = () => {
    renderFrequencyGraph(radii, height, width);
    renderHistogram(frequencys, height, width);
    updateFilters(!flag);
  };

  useEffect(() => {
    renderGraphs();
  }, [activeId]);
  return (
    <div className="rounded border overflow-hidden">
      <CollapseTitle
        forBody="frequency-graph"
        title="Frequency"
        titleType="h4"
        className="ms-2"
        collapseFunc={renderGraphs}
      />
      <div id="frequency-graph" className="collapse">
        <BarGraphInit data={radii} id="frequency" />
      </div>
      <CollapseTitle
        forBody="histogram"
        title="Histogram"
        titleType="h4"
        className="ms-2"
        collapseFunc={renderGraphs}
      />
      <div id="histogram" className="collapse">
        <BarGraphInit data={frequencys} id="histogram" />
      </div>
    </div>
  );
};

export default Graphs;
