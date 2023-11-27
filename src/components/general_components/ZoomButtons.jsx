import Button from "./Button";
import ZoomInIcon from "../../assets/icons/ZoomInIcon";
import ZoomOutIcon from "../../assets/icons/ZoomOutIcon";
import RecenterIcon from "../../assets/icons/RecenterIcon";

const ZoomButtons = ({
  className,
  handleZoomIn,
  handleZoomOut,
  isDisabled,
  recenter,
}) => {
  return (
    <div
      className="input-group btn-group-sm flex-nowrap justify-content-center"
      role="group"
    >
      <Button
        className={className}
        isDisabled={isDisabled}
        text={<ZoomInIcon />}
        handleClick={handleZoomIn}
        style={{ zIndex: "auto" }}
      />
      <Button
        className={className}
        isDisabled={isDisabled}
        text={<ZoomOutIcon />}
        handleClick={handleZoomOut}
        style={{ zIndex: "auto" }}
      />
      <Button
        className={className}
        isDisabled={isDisabled}
        handleClick={recenter}
        text={<RecenterIcon />}
        style={{ zIndex: "auto" }}
      />
    </div>
  );
};

export default ZoomButtons;
