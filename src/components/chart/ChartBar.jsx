import Button from "../general_components/Button";
import Slider from "../general_components/Slider";
import ZoomButtons from "../general_components/ZoomButtons";
import TimeSlider from "./TimeSlider";
import PlayIcon from "../../assets/icons/PlayIcon";
import PauseIcon from "../../assets/icons/PauseIcon";
import StopIcon from "../../assets/icons/StopIcon";
import "./ChartBar.css";
import { useContext } from "react";
import { TooltipContext } from "../../utilities/TooltipContext";

const ChartBar = ({
  recenter,
  pausePlay,
  isPlaying,
  hideBar,
  stop,
  updateSpeed,
  setUpdateSpeed,
  time,
  units,
  renderSkipToFrame,
  zoomCenter,
  pathName,
}) => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);
  return (
    <div
      className="position-absolute"
      id="chart-bar"
      style={{ opacity: hideBar }}
    >
      <TimeSlider {...{ units, time, renderSkipToFrame }} />

      <div className="row align-items-center my-1 mx-0">
        <div className="col d-flex justify-content-center px-1">
          <Button
            handleClick={pausePlay}
            text={isPlaying ? <PauseIcon /> : <PlayIcon />}
            className="btn btn-outline-primary"
            id="pause-play-button"
          />
        </div>
        <div className="col d-flex justify-content-center px-1">
          <Button
            handleClick={stop}
            text={<StopIcon />}
            className="btn btn-outline-primary"
            id="stop-button"
          />
        </div>
        <div
          className="col-3 px-1 text-center"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          data-tooltip={pathName}
          onMouseEnter={tooltipIn}
          onMouseLeave={tooltipOut}
        >
          {pathName}
        </div>
        <div className="col px-1">
          <ZoomButtons
            className="btn btn-outline-primary"
            handleZoomIn={() => zoomCenter(true)}
            handleZoomOut={() => zoomCenter(false)}
            recenter={recenter}
          />
        </div>
        <div className="col px-2">
          <Slider
            value={updateSpeed}
            setValue={setUpdateSpeed}
            min={0}
            max={1}
            text="Speed"
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartBar;
