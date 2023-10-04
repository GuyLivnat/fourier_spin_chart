import ChartInit from './ChartInit';
import renderChart from './renderChart'
import timestep from './math/timestep';
import { useRef, useState, useEffect } from 'react';
import useInterval from '../../utilities/useInterval';
import useListeners from '../../utilities/useListeners';
import zoomWheelSVGListeners from '../../behaviors/zoomWheelSVGListeners';
import clickToPlayListeners from '../../behaviors/clickToPlayListeners';
import zoomCenterSVG from '../../behaviors/zoomCenterSVG';
import panSVGListeners from '../../behaviors/panSVGListeners';
import ChartBar from './ChartBar';
import moveChart from './moveChart';


const Chart = ({units, coeff, playable}) => {


    const lineSegments = 40; // used for the gradient effect on the outline
    const maxSpeed = 128;

    const edge = useRef([]);
    const time = useRef(0);

    const zoom = useRef(1000);
    const panX = useRef(0);
    const panY = useRef(230);

    const [updateSpeed, setUpdateSpeed] = useState(85);  //in miliseconds. calculated as maxspeed-updatespeed
    const [radiiActive, setRadiiActive] = useState(true);
    const [circlesActive, setCirclesActive] = useState(true);
    const [outlineActive, setOutlineActive] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hideBar, setHideBar] = useState(100);
    const [listeners, setListeners] = useState([{evnt:null, func:null}])
    

    const pausePlay = () => {
        setIsPlaying(!isPlaying)
    };

    const stop = () => {
        if (isPlaying) {
            setIsPlaying(false)
        }
        time.current = 0;
        edge.current = [];
        renderChart(timestep([], 0), [], lineSegments, units, zoom.current, 0);
    };
   
    const update = () => {  // computes the next frame 
        const step = 1/(units*2);
        if (time.current === 1) time.current = 0
        else time.current += step

        const frame = timestep(coeff.current, time.current);

        edge.current.unshift({ x: frame.edge.x, y: frame.edge.y });
        if (edge.current.length > units) edge.current.pop();

        renderChart(frame, edge.current, lineSegments, units, zoom.current, coeff.current.length);
    };

    const handleZoomandPan = () => {
        moveChart(panX, panY, zoom);
        if (!isPlaying) {
            const frame = timestep(coeff.current, time.current);
            renderChart(frame, edge.current, lineSegments, units, zoom.current, coeff.current.length);
        }
    }
    
    const zoomCenter = (inOut) => {
        zoomCenterSVG('chart', panY, zoom, handleZoomandPan, inOut)
    };

  
    useEffect(() => {    //runs once, without this, the zoom and pan listener functions fail to load right, as they load before the svg is made
        const zoomListeners = zoomWheelSVGListeners('chart', panX, panY, zoom, handleZoomandPan);
        const panListeners = panSVGListeners('chart', panX, panY, zoom, handleZoomandPan);
        setListeners([...zoomListeners, ...panListeners])
    }, [])

    useListeners('chart', listeners, [listeners]) // adds stateless listeners (zoom and pan)
    useListeners('chart', clickToPlayListeners(pausePlay), [isPlaying]) //adds click to pause/play
    useInterval(update, isPlaying? (maxSpeed - updateSpeed) : null); //plays the chart

    return(
        <div className="col order-1 mt-5">
            <div
                className="position-relative"
                id="chart_div"
                onMouseEnter={() => setHideBar(100)}
                onMouseLeave={() => isPlaying && setHideBar(0)}
            >
                <div
                    className='position-absolute'
                    style={{opacity:hideBar, transition: "opacity .25s cubic-bezier(0,0,.2,1)", bottom:0, right:0, left:0, background:"blue"}}
                >
                    <ChartBar
                        pausePlay={pausePlay}
                        isPlaying={isPlaying}
                        playable={playable}
                        stop={stop}
                        updateSpeed={updateSpeed}
                        setUpdateSpeed={setUpdateSpeed}
                        maxSpeed={maxSpeed}
                        circlesActive={circlesActive}
                        setCirclesActive={setCirclesActive}
                        radiiActive={radiiActive}
                        setRadiiActive={setRadiiActive}
                        outlineActive={outlineActive}
                        setOutlineActive={setOutlineActive}
                        zoomCenter={zoomCenter}
                    />
                </div>
                <ChartInit
                    circlesActive={circlesActive}
                    radiiActive={radiiActive}
                    outlineActive={outlineActive}
                    lineSegments={lineSegments}
                    coeffLength={coeff.current.length}
                />
            </div>
        </div>
    )
};

export default Chart;