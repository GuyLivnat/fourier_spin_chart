import { useEffect, useState } from "react";
import renderSpreadGraph from "./graph_renders/renderSpreadGraph";
import Button from "../../general_components/Button";
import BarGraphInit from "./graph_inits/BarGraphInit";
import renderFrequencyGraph from "./graph_renders/renderFrequencyGraph";

const Graphs = ({ coeff }) => {
  const height = 200;
  const graphs = document.getElementById("graphs");
  const width = graphs ? graphs.clientWidth : 0;

  const [flag, updateFilters] = useState(true);

  const radii = coeff.current.filter((_, i) => i % 2 === 0 && i !== 0);

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

  const rerender = () => {
    renderSpreadGraph(radii, height, width);
    renderFrequencyGraph(frequencys, height, width);
    updateFilters(!flag);
  };

  // useEffect(() => {
  //   rerender();
  // }, []);
  return (
    <div>
      <div>
        <Button handleClick={rerender} text={"update"} />
      </div>
      <div>
        <BarGraphInit data={radii} id="spread" />
      </div>
      <div>
        <br />
      </div>
      <div>
        <BarGraphInit data={frequencys} id="frequency" />
      </div>
    </div>
  );
};

export default Graphs;
