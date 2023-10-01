import ChartInit from './ChartInit';
import runChart from './runChart'
import timestep from './math/timestep';
import { useEffect, useRef, useState } from 'react';
import useInterval from '../utilities/useInterval';
import zoomWheelSVG from '../behaviors/zoomWheelSVG';
import zoomCenterSVG from '../behaviors/zoomCenterSVG';
import panSVG from '../behaviors/panSVG';
import ChartBar from './ChartBar';

const ChartMain = ({units, coeff, playable}) => {


    const lineSegments = 40; // used for the gradient effect on the outline
    const maxSpeed = 66;
    const chart = document.getElementById("chart");

    const updateSpeed = useRef(20);  //in miliseconds. 33 is 30 fps
    const edge = useRef([]);
    const time = useRef(0);

    const [zoom, setZoom] = useState(1000);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(230);
    const [radiiActive, setRadiiActive] = useState(true);
    const [circlesActive, setCirclesActive] = useState(true);
    const [outlineActive, setOutlineActive] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hideBar, setHideBar] = useState(false)
    

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
        const frame = timestep(coeff.current, time.current);
        edge.current.unshift({ x: frame.edge.x, y: frame.edge.y });
        if (edge.current.length > units) edge.current.pop();

        runChart(frame, edge.current, lineSegments, units, zoom, coeff.current.length);

    };

    const stop = () => {
        if (isPlaying) {
            setIsPlaying(false)
        }
        runChart(timestep([], 0), [], lineSegments, units, zoom, 0)
        time.current = 0;
        edge.current = [];
    };

    const handleZoom = (inOut) => {
        zoomCenterSVG(chart, panY, setPanY, zoom, setZoom, inOut)
    };


    useInterval(update, isPlaying? (maxSpeed - updateSpeed.current) : null); //plays the chart
    zoomWheelSVG(chart, panX, panY, setPanX, setPanY, zoom, setZoom);
    panSVG(chart, panX, panY, setPanX, setPanY, zoom);

    return(<div className="col order-1 mt-5">
        <div
        className="position-relative"
        id="chart_div"
        onMouseEnter={() => setHideBar(false)}
        onMouseLeave={() => isPlaying && setHideBar(true)}>
            <div
            className='position-absolute'
            hidden={hideBar}
            style={{bottom:"0px"}}>
                <ChartBar
                pausePlay={pausePlay}
                isPlaying={isPlaying}
                playable={playable}
                stop={stop}
                updateSpeed={updateSpeed}
                maxSpeed={maxSpeed}
                circlesActive={circlesActive}
                setCirclesActive={setCirclesActive}
                radiiActive={radiiActive}
                setRadiiActive={setRadiiActive}
                outlineActive={outlineActive}
                setOutlineActive={setOutlineActive}
                handleZoom={handleZoom}
                />
            </div>
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
    </div>

        </div>)
};

export default ChartMain;