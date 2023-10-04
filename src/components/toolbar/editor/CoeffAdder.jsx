import NumberInput from "../../general_components/NumberInput";
import Button from "../../general_components/Button";
import AngleIcon from "../../../assets/icons/AngleIcon";
import RadiusIcon from "../../../assets/icons/RadiusIcon";
import { useContext } from "react";
import { TooltipContext } from "../../general_components/TooltipWithContext";

const CoeffAdder = ({setRadius, setAngle, angle, radius, pushCoeff, resetCoeff, save, playable}) => {
    const {tooltipIn, tooltipOut} = useContext(TooltipContext);
    return (<>
        <div className=" input-group mb-1">
            <Button
                handleClick={pushCoeff}
                text="add"
                className="btn btn-outline-primary"
                dataTooltip="adds a circle to the end of the chain"
                onMouseEnter={tooltipIn}
                onMouseLeave={tooltipOut}
            />
            <span
                className="input-group-text text-bg-dark tooltip"
                data-tooltip="radius"
                onMouseEnter={tooltipIn}
                onMouseLeave={tooltipOut}
            >
                <RadiusIcon/>
            </span>
            <NumberInput
                number={radius}
                setNumber={setRadius}
                min={0}
                className={"text-bg-secondary"}
                id={"radius"}
            />
            <span
                className="input-group-text text-bg-dark"
                data-tooltip="angle (in radians)"
                onMouseEnter={tooltipIn}
                onMouseLeave={tooltipOut}
            >
                <AngleIcon/>
            </span>
            <NumberInput
                number={angle}
                setNumber={setAngle}
                step={0.1}
                placeholder={"i"}
                className={"text-bg-secondary"}
                id={"angle"}
            />
        </div>
        <div className="mb-3">
            <Button
                handleClick={save}
                text="save"
                className="btn btn-outline-primary"
                isDisabled={!playable}
                dataTooltip="saves the circle chain with the current time as its name"
                onMouseEnter={tooltipIn}
                onMouseLeave={tooltipOut}
            />
            <Button
                handleClick={resetCoeff}
                text="reset"
                className="btn btn-outline-danger float-end"
                dataTooltip="removes all the circles"
                onMouseEnter={tooltipIn}
                onMouseLeave={tooltipOut}
            />
        </div>
    </>)

}

export default CoeffAdder;

