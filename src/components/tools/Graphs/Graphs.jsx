import { useContext, useEffect, useState } from "react";
import renderFrequencyGraph from "./renderFrequencyGraph";
import BarGraphInit from "./BarGraphInit";
import renderHistogram from "./renderHistogram";
import CollapseTitle from "../../general_components/CollapseTitle";
import { CoeffContext } from "../../../contexts/CoeffContext";
import Histogram from "./Histogram";

const Graphs = () => {
  const { coeff, activeId } = useContext(CoeffContext);

  const height = 200;
  const graphs = document.getElementById("graphs");
  const width = graphs ? graphs.clientWidth : 0;

  const [updateFilters, setUpdateFilters] = useState(true);

  const radii = coeff.current.map((circle) => circle.r);

  const histogram = {};

  for (let i = 0; i < radii.length; i++) {
    const radius = Math.round(radii[i]);
    if (!histogram[radius]) histogram[radius] = 1;
    else histogram[radius] += 1;
  }

  const spreadHistogram = [];

  for (const [radius, frequency] of Object.entries(histogram)) {
    spreadHistogram.push({ radius: parseInt(radius), frequency: frequency });
  }

  const renderGraphs = () => {
    renderFrequencyGraph(radii, height, width);
    renderHistogram(spreadHistogram, height, width);
    setUpdateFilters(!updateFilters);
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
        <Histogram {...{ spreadHistogram, height }} />
      </div>
    </div>
  );
};

export default Graphs;
