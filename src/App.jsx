import runChart from './chart/runChart'
import Button from './Button';
import timestep from './chart/timestep';
import { useRef, useState } from 'react';
import ChartInit from './chart/ChartInit';

import Slider from './slider';
import ToggleSwitch from './ToggleSwitch';

import useInterval from './utilities/useInterval';
import zoomSVG from './utilities/zoomSVG';
import panSVG from './utilities/panSVG';
import CoeffToolBar from './CoeffToolBar';



function App() {
  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const lineSegments = 40; // used for the gradient effect on the outline
  const maxSpeed = 66;
  const updateSpeed = useRef(45);  //in miliseconds. 33 is 30 fps
  const coeff = useRef([]);
  let playable = coeff.current.length < 3;
  const frame = useRef(timestep(coeff, 0));
  const edge = useRef([]);
  const time = useRef(0);
  const [tick, setTick] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1000);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(230);
  const [radiiActive, setRadiiActive] = useState("true");
  const [circlesActive, setCirclesActive] = useState("true");
  const [outlineActive, setOutlineActive] = useState("true");


  const timeTick = () => {
    setTick(time.current);
  }

  const stop = () => {
    if (isPlaying) {
      setIsPlaying(false)
    }
    frame.current = timestep([], 0);
    time.current = 0;
    edge.current = [];
    timeTick();
  }

  const pausePlay = () => {
    setIsPlaying(!isPlaying)
  }
  
  const update = () => {  // computes the next frame 
    const step = 1/(units*2);
    if (time.current === 1) {
      time.current = 0
    } else {
      time.current += step
    }
    frame.current = timestep(coeff.current, time.current);
    edge.current.unshift({ x: frame.current.edge.x, y: frame.current.edge.y });
    if (edge.current.length > units) edge.current.pop();
    timeTick();
  };

  const showHideCircles = () => {
    setCirclesActive((circlesActive === "none")? "true" : "none")
  };

  const showHideRadii = () => {
    setRadiiActive((radiiActive === "none")? "true" : "none")
  }

  const showHideOutline = () => {
    setOutlineActive((outlineActive === "none")? "true" : "none")
  }

  useInterval(update, isPlaying? (maxSpeed - updateSpeed.current) : null) //runs the chart
  zoomSVG(document.getElementById("chart"), panX, panY, setPanX, setPanY, zoom, setZoom)
  panSVG(document.getElementById("chart"), panX, panY, setPanX, setPanY, zoom)
  runChart(frame.current, edge.current, lineSegments, units)

  return (
  <section className="container-fluid text-bg-dark">
    <div className="row">
      <div className="col order-1 mt-5" id="chart_div">
          <ChartInit
            panX={panX}
            panY={panY}
            zoom={zoom}
            circlesActive={circlesActive}
            radiiActive={radiiActive}
            outlineActive={outlineActive}
            lineSegments={lineSegments}/>

        <div className="row align-items-center justify-content-start">
          <div className="col-1 m-3" id="pausePlay">
            <Button handleClick={pausePlay}
              text={isPlaying? '\u23F8' : "\u23F5"}
              isDisabled={playable}
              className={"btn btn-primary btn-lg"}/>
            </div>
          <div className="col-1 m-2">
            <Button handleClick={stop}
              text={'\u23F9'}
              isDisabled={playable}
              className={"btn btn-outline-primary"}/>
          </div>
          <div className="col-2 m-2">
            <Slider
              value={updateSpeed}
              min={0}
              max={maxSpeed}
              text={"speed"}/>
          </div>
          <div className="col-1 m-2">
            <ToggleSwitch
              label={"Circles"}
              handleClick={showHideCircles}
              isDisabled={playable}
              checked={(circlesActive === "none")? false : true}/>
          </div>
          <div className="col-1 m-2">
            <ToggleSwitch
              label={"Radii"}
              handleClick={showHideRadii}
              isDisabled={playable}
              checked={(radiiActive === "none")? false : true}/>
          </div>
          <div className="col-1 m-2">
            <ToggleSwitch
              label={"Outline"}
              handleClick={showHideOutline}
              isDisabled={playable}
              checked={(outlineActive === "none")? false : true}/>
          </div>
          <div className="col-2 mt-2">
            <Slider
              value={zoom}
              setValue={setZoom}
              min={100}
              max={1000}
              text={"zoom"}/>
          </div>
        </div>
      </div>
      <CoeffToolBar
        playable={playable}
        coeff={coeff}
        tick={tick}
        setTick={setTick}
        stop={stop}
        units={units}/>
    </div>
  </section>)
};

export default App
