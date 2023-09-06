import { useState } from "react";
import NumberInput from "../NumberInput";
import Button from "../Button";

const CoeffAdder = ({setRadius, setAngle, angle, radius, pushCoeff, resetCoeff, save}) => {

    return (<>
        <div className="input-group mb-1">
            <span className="input-group-text text-bg-secondary">radian</span>
            <NumberInput
            number={angle}
            setNumber={setAngle}
            step={0.1}
            placeholder={"i"}
            className={"text-bg-info"}
            id={"radians"}
            />
        </div>
        <div className="input-group mb-1">
            <span className="input-group-text text-bg-secondary">radius</span>
            <NumberInput
            number={radius}
            setNumber={setRadius}
            min={0}
            className={"text-bg-info"}
            id={"radius"}
            />
            <Button
            handleClick={pushCoeff}
            text="add"
            className="btn btn-outline-primary"
            />
        </div>
        <div className="mb-3">
            <Button
            handleClick={save}
            text="save"
            className="btn btn-outline-primary"
            />
            <Button
            handleClick={resetCoeff}
            text="reset"
            className="btn btn-outline-danger float-end"
            />
        </div>
    </>)

}

export default CoeffAdder;

