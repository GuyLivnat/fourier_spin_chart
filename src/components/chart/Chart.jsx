import ChartInit from "./ChartInit";
import renderChart from "./renderChart";
import renderTimeSlider from "./renderTimeSlider";
import computeFrame from "./math/computeFrame";
import { useRef, useState, useEffect } from "react";
import useInterval from "../../utilities/useInterval";
import useListeners from "../../utilities/useListeners";
import zoomWheelSVGListeners from "../../behaviors/zoomWheelSVGListeners";
import clickToPlayListeners from "../../behaviors/clickToPlayListeners";
import zoomCenterSVG from "../../behaviors/zoomCenterSVG";
import zoomToSVG from "../../behaviors/zoomToSVG";
import panSVGListeners from "../../behaviors/panSVGListeners";
import ChartBar from "./ChartBar";
import ChartOverlay from "./ChartOverlay";

const Chart = ({ units, coeff, playable, pathName, chartColors }) => {
  const lineSegments = 32; // used for the gradient effect on the outline

  const outline = useRef([]);
  const time = useRef(0);
  const frame = useRef(computeFrame([], 0));
  const step = 1 / units;

  const zoom = useRef(1000);
  const panX = useRef(0);
  const panY = useRef(230);

  const maxSpeed = 128;
  const [updateSpeed, setUpdateSpeed] = useState(85); //in miliseconds. calculated as maxspeed-updatespeed
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
      units,
      zoom.current,
      panX.current,
      panY.current,
      coeff.current.length
    );
    renderTimeSlider(time.current);
  };

  const timestep = () => {
    if (time.current === 1) time.current = 0;
    else time.current += step;
  };

  const renderNextFrame = () => {
    timestep();
    frame.current = computeFrame(coeff.current, time.current);
    outline.current.unshift({
      x: frame.current.outline.x,
      y: frame.current.outline.y,
    });
    if (outline.current.length > 1.1 * units) outline.current.pop();
    renderFrame();
  };

  const renderSkipToFrame = (skipToTime) => {
    if (outline.current.length < units) {
      time.current = 0;
      outline.current = [];
    }
    let distance =
      skipToTime >= time.current
        ? skipToTime - time.current
        : 1 - time.current + skipToTime;
    while (distance !== 0) {
      timestep();
      let missingFrame = computeFrame(coeff.current, time.current);
      outline.current.unshift({
        x: missingFrame.edge.x,
        y: missingFrame.outline.y,
      });
      if (outline.current.length > 1.1 * units) outline.current.pop();
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
  useInterval(renderNextFrame, isPlaying ? maxSpeed - updateSpeed : null); //plays the chart

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
          maxSpeed,
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
        }}
        coeffLength={coeff.current.length}
      />
    </div>
  );
};

export default Chart;
