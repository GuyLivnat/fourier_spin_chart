import Button from "./Button";
import ZoomInIcon from '../../assets/icons/ZoomInIcon';
import ZoomOutIcon from '../../assets/icons/ZoomOutIcon';

const ZoomButtons = ({className, handleZoomIn, handleZoomOut, isDisabled}) => {

    return (
    <div
        className="input-group btn-group-sm flex-nowrap justify-content-center" 
        role="group"
    >
        <Button 
            className={className}
            isDisabled={isDisabled}
            text={<ZoomInIcon/>}
            handleClick={handleZoomIn}
        />
        <Button 
            className={className}
            isDisabled={isDisabled}
            text={<ZoomOutIcon/>}
            handleClick={handleZoomOut}
        />
    </div>)

}

export default ZoomButtons;