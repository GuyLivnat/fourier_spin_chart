import NumberInput from "../../components/NumberInput";
import Button from "../../components/Button";
import AngleIcon from "../../assets/icons/AngleIcon";

const CoeffAdder = ({setRadius, setAngle, angle, radius, pushCoeff, resetCoeff, save, playable}) => {
    return (<>
        <div className=" input-group mb-1">
            <Button
                handleClick={pushCoeff}
                text="add"
                className="btn btn-outline-primary "
            />
            <span
                className="input-group-text text-bg-dark">
                {'\u2300'}
            </span>
            <NumberInput
                number={radius}
                setNumber={setRadius}
                min={0}
                className={"text-bg-secondary"}
                id={"radius"}
            />
            <span className="input-group-text text-bg-dark"><AngleIcon/></span>
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
                isDisabled={playable}
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

