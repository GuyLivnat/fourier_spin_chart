import ChartInit from "./ChartInit";
import renderChart from "./renderChart";
import renderTimeSlider from "./renderTimeSlider";
import computeFrame from "./math/computeFrame";
import { useRef, useState, useEffect, useContext } from "react";
import useInterval from "../../utilities/useInterval";
import useListeners from "../../utilities/useListeners";
import zoomWheelSVGListeners from "../../behaviors/zoomWheelSVGListeners";
import clickToPlayListeners from "../../behaviors/clickToPlayListeners";
import zoomCenterSVG from "../../behaviors/zoomCenterSVG";
import zoomToSVG from "../../behaviors/zoomToSVG";
import panSVGListeners from "../../behaviors/panSVGListeners";
import ChartBar from "./ChartBar";
import ChartOverlay from "./ChartOverlay";
import { CoeffContext } from "../../contexts/CoeffContext";

const Chart = () => {
  const { units, coeff, playable, pathName, chartColors } =
    useContext(CoeffContext);

  const lineSegments = 32; // used for the gradient effect on the outline

  const test = [];
  // const length = coeff.current.length > 256 ? coeff.current.length / 2 : 128;

  const length = 256;

  const outline = useRef([]);
  const time = useRef(0);
  const frame = useRef(computeFrame([], 0));
  const step = 1 / 256;

  const zoom = useRef(1000);
  const panX = useRef(0);
  const panY = useRef(230);

  const [updateSpeed, setUpdateSpeed] = useState(0.7); //calculated as 1-updatespeed to flip the slider to left to right
  const [isPlaying, setIsPlaying] = useState(false);
  const [hideBar, setHideBar] = useState(100);
  const [listeners, setListeners] = useState([{ evnt: null, func: null }]);

  useEffect(() => {
    // runs once after render. without this, the zoom and pan listener functions fail to load right,
    // as they load before the svg is made
    const zoomListeners = zoomWheelSVGListeners(
      "chart",
      panX,
      panY,
      zoom,
      renderFrame
    );
    const panListeners = panSVGListeners(
      "chart",
      panX,
      panY,
      zoom,
      renderFrame
    );
    setListeners([...zoomListeners, ...panListeners]);
  }, []);

  const pausePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stop = () => {
    setIsPlaying(false);
    time.current = 0;
    outline.current = [];
    frame.current = computeFrame([], 0);
    renderFrame();
    setHideBar(100);
  };

  const renderFrame = () => {
    renderChart(
      frame.current,
      outline.current,
      lineSegments,
      zoom.current,
      panX.current,
      panY.current,
      coeff.current
    );
    renderTimeSlider(time.current);
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

  const renderSkipToFrame = (skipToTime) => {
    if (outline.current.length < length) {
      // checks if this is the first round
      time.current = 0;
      outline.current = [];
    }
    let distance =
      skipToTime >= time.current
        ? skipToTime - time.current
        : 1 - time.current + skipToTime;
    while (distance !== 0) {
      nextFrame();
      distance -= step;
    }
    renderNextFrame();
  };

  const zoomCenter = (inOut) => {
    zoomCenterSVG("chart", panY, zoom, renderFrame, inOut);
  };

  const recenter = () => {
    zoomToSVG("chart", panX, panY, zoom, 0, 230, 1000, renderFrame);
  };

  useListeners("chart", listeners, [listeners]); // adds stateless listeners (zoom and pan)
  useListeners("chart", clickToPlayListeners(pausePlay), [isPlaying]); //adds click to pause/play
  useInterval(renderNextFrame, isPlaying ? (1 - updateSpeed) * 200 : null); //plays the chart\

  // console.log(frame.current);

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setHideBar(100)}
      onMouseLeave={() => isPlaying && setHideBar(0)}
    >
      <ChartBar
        {...{
          hideBar,
          pausePlay,
          isPlaying,
          stop,
          updateSpeed,
          setUpdateSpeed,
          zoomCenter,
          time,
          units,
          renderSkipToFrame,
          pathName,
          recenter,
        }}
      />
      <ChartOverlay {...{ playable, chartColors }} />
      <ChartInit
        {...{
          lineSegments,
          chartColors,
          coeff,
        }}
      />
    </div>
  );
};

export default Chart;
