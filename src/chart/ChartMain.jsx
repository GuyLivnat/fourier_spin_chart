import ChartInit from './ChartInit';
import Button from '../Button';
import Slider from '../Slider';
import ToggleSwitch from '../ToggleSwitch';
import runChart from './runChart'
import timestep from './timestep';
import { useRef, useState } from 'react';
import useInterval from '../utilities/useInterval';
import zoomWheelSVG from '../utilities/zoomWheelSVG';
import zoomCenterSVG from '../utilities/zoomCenterSVG';
import panSVG from '../utilities/panSVG';

const ChartMain = ({units, coeff, playable, setTick}) => {


    const lineSegments = 40; // used for the gradient effect on the outline
    const maxSpeed = 66;
    const chart = document.getElementById("chart");

    const updateSpeed = useRef(20);  //in miliseconds. 33 is 30 fps
    const frame = useRef(timestep(coeff, 0));
    const edge = useRef([]);
    const time = useRef(0);

    const [zoom, setZoom] = useState(1000);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(230);
    const [radiiActive, setRadiiActive] = useState(true);
    const [circlesActive, setCirclesActive] = useState(true);
    const [outlineActive, setOutlineActive] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    

    const pausePlay = () => {
        setIsPlaying(!isPlaying)
    };
      
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

    const timeTick = () => {
        setTick(time.current);
    };

    const stop = () => {
        if (isPlaying) {
            setIsPlaying(false)
        }
        frame.current = timestep([], 0);
        time.current = 0;
        edge.current = [];
        timeTick();
    };

    const handleZoom = (inOut) => {
        zoomCenterSVG(chart, panY, setPanY, zoom, setZoom, setTick, inOut)
    };
    

    useInterval(update, isPlaying? (maxSpeed - updateSpeed.current) : null) //plays the chart
    zoomWheelSVG(chart, panX, panY, setPanX, setPanY, zoom, setZoom, setTick)
    panSVG(chart, panX, panY, setPanX, setPanY, zoom, setTick)
    runChart(frame.current, edge.current, lineSegments, units, zoom, coeff.current.length)

    return(
        <div className="col order-1 mt-5" id="chart_div">
            <ChartInit
                panX={panX}
                panY={panY}
                zoom={zoom}
                circlesActive={circlesActive}
                radiiActive={radiiActive}
                outlineActive={outlineActive}
                lineSegments={lineSegments}
                coeffLength={coeff.current.length}/>
            <div className="row align-items-center">
                <div className="col-1 m-3" id="pausePlay">
                    <Button
                        handleClick={pausePlay}
                        text={isPlaying? '\u23F8' : '\u23F5'}
                        isDisabled={playable}
                        className="btn btn-primary btn-lg"/>
                </div>
                <div className="col-1 m-2">
                    <Button
                        handleClick={stop}
                        text={'\u23F9'}
                        isDisabled={playable}
                        className={"btn btn-outline-primary"}
                        id="stopButton"/>
                </div>
                <div className="col-1 m-2">
                    <span>🔍</span>
                    <div className="btn-group btn-group-sm" role="group">
                        <Button 
                            className='btn btn-outline-primary'
                            isDisabled={playable}
                            text={'+'}
                            handleClick={() => handleZoom(true)}/>
                        <Button 
                            className='btn btn-outline-primary'
                            isDisabled={playable}
                            text={'-'}
                            handleClick={() => handleZoom(false)}/>
                    </div>
                </div>
                <div className="col-2 m-2">
                    <Slider
                        value={updateSpeed}
                        min={0}
                        max={maxSpeed}
                        text="speed"
                        setTick={setTick}
                        disabled={playable}/>
                </div>
                <div className="col-1 m-2">
                    <ToggleSwitch
                        label={"Circles"}
                        handleClick={() => setCirclesActive(!circlesActive)}
                        isDisabled={playable}
                        checked={circlesActive}/>
                </div>
                <div className="col-1 m-2">
                    <ToggleSwitch
                        label="Radii"
                        handleClick={() => setRadiiActive(!radiiActive)}
                        isDisabled={playable}
                        checked={radiiActive}/>
                </div>
                <div className="col-1 m-2">
                    <ToggleSwitch
                        label="Outline"
                        handleClick={() => setOutlineActive(!outlineActive)}
                        isDisabled={playable}
                        checked={outlineActive}/>
                </div>
            </div>
        </div>)
};

export default ChartMain;