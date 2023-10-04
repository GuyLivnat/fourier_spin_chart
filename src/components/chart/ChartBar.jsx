import ZoomInIcon from '../../assets/icons/ZoomInIcon';
import ZoomOutIcon from '../../assets/icons/ZoomOutIcon';
import Button from '../general_components/Button';
import Slider from '../general_components/Slider';
import ToggleSwitch from '../general_components/ToggleSwitch';

const ChartBar = ({pausePlay, isPlaying, playable, stop, updateSpeed, setUpdateSpeed, maxSpeed,
    circlesActive, setCirclesActive, radiiActive, setRadiiActive, outlineActive, setOutlineActive, zoomCenter}) => {

    return (
        <div className="row align-items-center my-1 mx-0">
            <div className="col d-flex justify-content-center px-1" id="pausePlay">
                <Button
                    handleClick={pausePlay}
                    text={isPlaying? '\u23F8' : '\u23F5'}
                    isDisabled={playable}
                    className={isPlaying? "btn btn-outline-primary" : "btn btn-primary"}/>
            </div>
            <div className="col d-flex justify-content-center px-1">
                <Button
                    handleClick={stop}
                    text={'\u23F9'}
                    isDisabled={playable}
                    className="btn btn-outline-primary"
                    id="stopButton"/>
            </div>
            <div className="col px-1">
                <div className="input-group btn-group-sm flex-nowrap" role="group">
                    <Button 
                        className='btn btn-outline-primary'
                        isDisabled={playable}
                        text={<ZoomInIcon/>}
                        handleClick={() => zoomCenter(true)}/>
                    <Button 
                        className='btn btn-outline-primary'
                        isDisabled={playable}
                        text={<ZoomOutIcon/>}
                        handleClick={() => zoomCenter(false)}/>
                </div>
            </div>
            <div className="col px-2">
                <Slider
                    value={updateSpeed}
                    setValue={setUpdateSpeed}
                    min={0}
                    max={maxSpeed}
                    text="Speed"
                    disabled={playable}/>
            </div>
            <div className="col px-1">
                <ToggleSwitch
                    label={"Circles"}
                    handleClick={() => setCirclesActive(!circlesActive)}
                    isDisabled={playable}
                    checked={circlesActive}/>
            </div>
            <div className="col px-1">
                <ToggleSwitch
                    label="Radii"
                    handleClick={() => setRadiiActive(!radiiActive)}
                    isDisabled={playable}
                    checked={radiiActive}/>
            </div>
            <div className="col px-1">
                <ToggleSwitch
                    label="Outline"
                    handleClick={() => setOutlineActive(!outlineActive)}
                    isDisabled={playable}
                    checked={outlineActive}/>
            </div>
        </div>)
    }

export default ChartBar;

