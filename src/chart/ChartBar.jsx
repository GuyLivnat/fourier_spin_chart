import ZoomInIcon from '../assets/icons/ZoomInIcon';
import ZoomOutIcon from '../assets/icons/ZoomOutIcon';
import Button from '../components/Button';
import Slider from '../components/Slider';
import ToggleSwitch from '../components/ToggleSwitch';

const ChartBar = ({pausePlay, isPlaying, playable, stop, updateSpeed, setUpdateSpeed, maxSpeed,
    circlesActive, setCirclesActive, radiiActive, setRadiiActive, outlineActive, setOutlineActive, handleZoom}) => {



    return (
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
                <div className="input-group btn-group-sm flex-nowrap" role="group">
                    <Button 
                        className='btn btn-outline-primary'
                        isDisabled={playable}
                        text={<ZoomInIcon/>}
                        handleClick={() => handleZoom(true)}/>
                    <Button 
                        className='btn btn-outline-primary'
                        isDisabled={playable}
                        text={<ZoomOutIcon/>}
                        handleClick={() => handleZoom(false)}/>
                </div>
            </div>
            <div className="col-2 m-2">
                <Slider
                    value={updateSpeed}
                    setValue={setUpdateSpeed}
                    min={0}
                    max={maxSpeed}
                    text="speed"
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
        </div>)
    }

export default ChartBar;

