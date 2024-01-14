import { useContext, useEffect, useState } from "react";
import renderFrequencyGraph from "./renderFrequencyGraph";
import BarGraphInit from "./BarGraphInit";
import renderHistogram from "./renderHistogram";
import CollapseTitle from "../../general_components/CollapseTitle";
import { CoeffContext } from "../../../contexts/CoeffContext";
import Histogram from "./Histogram";

const Graphs = () => {
  const { coeff, activeId, clearFilters } = useContext(CoeffContext);

  const height = 200;
  const graphs = document.getElementById("graphs");
  const width = graphs ? graphs.clientWidth : 0;

  const [updateFilters, setUpdateFilters] = useState(true);

  const radii = coeff.current.map((circle) => circle.r);

  const frequencyMargin = {
    left: 40,
    right: 10,
    bottom: 16,
    top: 20,
  };

  const histogramMargin = {
    left: 30,
    right: 10,
    bottom: 35,
    top: 25,
  };

  const histogramObj = {};

  for (let i = 0; i < radii.length; i++) {
    const radius = Math.round(radii[i]);
    if (!histogramObj[radius]) histogramObj[radius] = 1;
    else histogramObj[radius] += 1;
  }

  const spreadHistogram = [];

  for (const [radius, frequency] of Object.entries(histogramObj)) {
    spreadHistogram.push({ radius: parseInt(radius), frequency: frequency });
  }

  const renderGraphs = () => {
    renderFrequencyGraph(radii, height, width, frequencyMargin);
    renderHistogram(spreadHistogram, height, width, histogramMargin);
    setUpdateFilters(!updateFilters);
  };

  useEffect(() => {
    renderGraphs();
    clearFilters();
  }, [activeId]); // (re)renders and resets the filters when a new coeff is given

  useEffect(() => {
    window.addEventListener("resize", renderGraphs);
    return () => window.removeEventListener("resize", renderGraphs);
  });

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
        <Histogram {...{ spreadHistogram, width, histogramMargin }} />
      </div>
    </div>
  );
};

export default Graphs;
