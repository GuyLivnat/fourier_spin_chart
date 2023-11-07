import ChartInit from "./ChartInit";
import renderChart from "./renderChart";
import useInterval from "../../utilities/useInterval";
import computeFrame from "./math/computeFrame";
import { useRef } from "react";

const HomeChart = ({ units, coeff }) => {
  const lineSegments = 32; // used for the gradient effect on the outline
  const edge = useRef([]);
  const time = useRef(0);
  const frame = useRef(computeFrame([], 0));
  const step = 1 / units;
  const edgeColor = { r: 172, g: 106, b: 106 };
  const backgroundColor = { r: 0, g: 0, b: 0 };

  const renderFrame = () => {
    renderChart(
      frame.current,
      edge.current,
      lineSegments,
      units,
      1000,
      0,
      230,
      coeff.length
    );
  };

  const timestep = () => {
    if (time.current === 1) time.current = 0;
    else time.current += step;
  };

  const renderNextFrame = () => {
    timestep();
    frame.current = computeFrame(coeff, time.current);
    edge.current.unshift({ x: frame.current.edge.x, y: frame.current.edge.y });
    if (edge.current.length > units) edge.current.pop();
    renderFrame();
  };

  useInterval(renderNextFrame, 43); //plays the chart

  return (
    <div className="col mt-3">
      <ChartInit
        circlesActive={true}
        outlineActive={true}
        radiiActive={true}
        coeffLength={coeff.length}
        lineSegments={lineSegments}
        edgeColor={edgeColor}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};

export default HomeChart;
