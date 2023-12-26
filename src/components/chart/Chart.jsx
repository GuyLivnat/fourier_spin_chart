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
  const { coeff, units, playable, pathName, chartColors, filteredCoeff } =
    useContext(CoeffContext);

  const lineSegments = 32; // used for the gradient effect on the outline

  // const length = coeff.current.length > 256 ? coeff.current.length / 2 : 128;

  const length = 256;

  const outline = useRef([]);
  const time = useRef(0);
  const frame = useRef(computeFrame([], 0));
  const step = 1 / length;

  const positionDefalts = {
    zoom: 200000,
    panX: 0,
    panY: 45000,
  };
  const zoom = useRef(positionDefalts.zoom);
  const panX = useRef(positionDefalts.panX);
  const panY = useRef(positionDefalts.panY);

  const [updateSpeed, setUpdateSpeed] = useState(0.5); //calculated as (0.7 - updateSpeed) * 200ms to flip the slider to left to right
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
      filteredCoeff.current,
      length,
      coeff.current.length,
      "chart"
    );
    renderTimeSlider(time.current);
  };

  const timestep = () => {
    if (time.current === 1 - step) time.current = 0;
    else time.current += step;
  };

  const nextFrame = () => {
    timestep();
    frame.current = computeFrame(filteredCoeff.current, time.current);
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
    zoomToSVG(
      "chart",
      panX,
      panY,
      zoom,
      positionDefalts.panX,
      positionDefalts.panY,
      positionDefalts.zoom,
      renderFrame
    );
  };

  useListeners("chart", listeners, [listeners]); // adds stateless listeners (zoom and pan)
  useListeners("chart", clickToPlayListeners(pausePlay), [isPlaying]); //adds click to pause/play
  useInterval(renderNextFrame, isPlaying ? (0.7 - updateSpeed) * 200 : null); //plays the chart\

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
        id={"chart"}
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
