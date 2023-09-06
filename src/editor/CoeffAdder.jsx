import { useState } from "react";
import NumberInput from "../NumberInput";
import Button from "../Button";

const CoeffAdder = ({setRadius, setAngle, angle, radius}) => {

    return (<>
        <div className="input-group">
            <span className="input-group-text">radius</span>
            <NumberInput
            number={radius}
            setNumber={setRadius}
            min={0.1}
            />
        </div>
        <div className="input-group">
            <span className="input-group-text">angle</span>
            <NumberInput
            number={angle}
            setNumber={setAngle}
            min={-2*Math.PI}
            max={2*Math.PI}
            step={0.1}
            />
        </div>
    </>)

}

export default CoeffAdder;