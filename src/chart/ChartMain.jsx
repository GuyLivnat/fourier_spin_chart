import ChartInit from './ChartInit';
import runChart from './runChart'
import timestep from './math/timestep';
import { useRef, useState } from 'react';
import useInterval from '../utilities/useInterval';
import zoomWheelSVG from '../behaviors/zoomWheelSVG';
import panSVG from '../behaviors/panSVG';
import ChartBar from './ChartBar';

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
                coeffLength={coeff.current.length}
            />
            <ChartBar
                pausePlay={pausePlay}
                isPlaying={isPlaying}
                playable={playable}
                stop={stop}
                updateSpeed={updateSpeed}
                maxSpeed={maxSpeed}
                setTick={setTick}
                circlesActive={circlesActive}
                setCirclesActive={setCirclesActive}
                radiiActive={radiiActive}
                setRadiiActive={setRadiiActive}
                outlineActive={outlineActive}
                setOutlineActive={setOutlineActive}
            />
        </div>)
};

export default ChartMain;