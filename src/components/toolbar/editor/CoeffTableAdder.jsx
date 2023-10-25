import NumberInput from "../../general_components/NumberInput";
import Button from "../../general_components/Button";
import { useContext } from "react";
import { TooltipContext } from "../../general_components/TooltipWithContext";

const CoeffTableAdder = ({setRadius, setAngle, angle, radius, pushCoeff}) => {
    const {tooltipIn, tooltipOut} = useContext(TooltipContext);
    return (<>
        <tr>
            <td className="px-3">
                <NumberInput
                    number={radius}
                    setNumber={setRadius}
                    min={0}
                    className={"text-bg-secondary text-center"}
                    id={"radius"}
                />
            </td>
            <td className="px-3">
                <NumberInput
                    number={angle}
                    setNumber={setAngle}
                    step={0.1}
                    className={"text-bg-secondary text-center"}
                    id={"angle"}
                />
            </td>
            <td className="pe-3">
                <Button
                    handleClick={pushCoeff}
                    text="+"
                    className="btn btn-outline-primary btn-sm"
                    dataTooltip="adds a circle to the end of the chain"
                    onMouseEnter={tooltipIn}
                    onMouseLeave={tooltipOut}
                    // style={{border:'none'}}
                />
            </td>
        </tr>
    </>)

}

export default CoeffTableAdder;

