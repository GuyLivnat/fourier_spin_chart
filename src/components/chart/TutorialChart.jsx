import { useRef } from "react";
import useInterval from "../../utilities/useInterval";
import ChartInit from "./ChartInit";
import computeFrame from "./math/computeFrame";
import renderChart from "./renderChart";

const TutorialChart = ({ coeff, hideOutline, chartId }) => {
  const chartColors = {
    outlineColor: {
      r: 172,
      g: 106,
      b: 106,
      hidden: hideOutline ? true : false,
      gamma: 0.3,
    },
    backgroundColor: { r: 0, g: 0, b: 0 },
    radiiColor: { r: 191, g: 194, b: 240, hidden: false },
    circlesColor: { r: 255, g: 255, b: 255, hidden: false },
  };

  const length = 256;
  const lineSegments = 32;

  const outline = useRef([]);
  const time = useRef(0);
  const frame = useRef(computeFrame([], 0));
  const step = 1 / length;

  const renderFrame = () => {
    renderChart(
      frame.current,
      outline.current,
      lineSegments,
      200000,
      0,
      45000,
      coeff.current,
      length,
      coeff.current.length,
      chartId
    );
  };
  const timestep = () => {
    if (time.current === 1 - step) time.current = 0;
    else time.current += step;
  };

  const nextFrame = () => {
    timestep();
    frame.current = computeFrame(coeff.current, time.current);
    outline.current.unshift({
      x: frame.current.outline.x,
      y: frame.current.outline.y,
    });
    if (outline.current.length > 1.1 * length) outline.current.pop();
  };
  const renderNextFrame = () => {
    nextFrame();
    renderFrame();
  };

  useInterval(renderNextFrame, 25);

  return <ChartInit id={chartId} {...{ lineSegments, coeff, chartColors }} />;
};

export default TutorialChart;
