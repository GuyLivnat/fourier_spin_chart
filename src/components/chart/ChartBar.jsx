import Button from '../general_components/Button';
import Slider from '../general_components/Slider';
import ToggleSwitch from '../general_components/ToggleSwitch';
import ZoomButtons from '../general_components/ZoomButtons';

const ChartBar = ({pausePlay, isPlaying, playable, stop, updateSpeed, setUpdateSpeed, maxSpeed,
    circlesActive, setCirclesActive, radiiActive, setRadiiActive, outlineActive, setOutlineActive, zoomCenter}) => {

    return (
        <div className="row align-items-center my-1 mx-0">
            <div className="col d-flex justify-content-center px-1" id="pausePlay">
                <Button
                    handleClick={pausePlay}
                    text={isPlaying? '\u23F8' : '\u23F5'}
                    className="btn btn-outline-primary"/>
            </div>
            <div className="col d-flex justify-content-center px-1">
                <Button
                    handleClick={stop}
                    text={'\u23F9'}
                    className="btn btn-outline-primary"
                    id="stop-button"/>
            </div>
            <div className="col px-1">
                <ZoomButtons
                    className='btn btn-outline-primary'
                    handleZoomIn={() => zoomCenter(true)}
                    handleZoomOut={() => zoomCenter(false)}/>
            </div>
            <div className="col px-2">
                <Slider
                    value={updateSpeed}
                    setValue={setUpdateSpeed}
                    min={0}
                    max={maxSpeed}
                    text="Speed"/>
            </div>
            <div className="col px-1">
                <ToggleSwitch
                    label={"Circles"}
                    handleClick={() => setCirclesActive(!circlesActive)}
                    checked={circlesActive}/>
            </div>
            <div className="col px-1">
                <ToggleSwitch
                    label="Radii"
                    handleClick={() => setRadiiActive(!radiiActive)}
                    checked={radiiActive}/>
            </div>
            <div className="col px-1">
                <ToggleSwitch
                    label="Outline"
                    handleClick={() => setOutlineActive(!outlineActive)}
                    checked={outlineActive}/>
            </div>
        </div>)
    }

export default ChartBar;

