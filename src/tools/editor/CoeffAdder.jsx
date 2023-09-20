import NumberInput from "../../components/NumberInput";
import Button from "../../components/Button";

const CoeffAdder = ({setRadius, setAngle, angle, radius, pushCoeff, resetCoeff, save, playable}) => {
    return (<>
        <div className="input-group mb-1">
            <span className="input-group-text text-bg-dark">angle</span>
            <NumberInput
                number={angle}
                setNumber={setAngle}
                step={0.1}
                placeholder={"i"}
                className={"text-bg-secondary"}
                id={"angle"}
            />
            <span className="input-group-text text-bg-dark">{'\u33ad'}</span> 
            {/* u33ad is the rad symbol, use the letters 'rad' if final font looks better that way */}
        </div>
        <div className="input-group mb-1">
            <span className="input-group-text text-bg-dark">radius</span>
            <NumberInput
                number={radius}
                setNumber={setRadius}
                min={0}
                className={"text-bg-secondary"}
                id={"radius"}
            />
            <span className="input-group-text text-bg-dark">px</span>
        </div>
        <div className="mb-3">
            <Button
                handleClick={pushCoeff}
                text="add"
                className="btn btn-outline-primary me-2"
            />
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

