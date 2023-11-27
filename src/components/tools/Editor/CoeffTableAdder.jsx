import NumberInput from "../../general_components/NumberInput";
import Button from "../../general_components/Button";
import { useContext } from "react";
import { TooltipContext } from "../../../utilities/TooltipContext";

const CoeffTableAdder = ({ setRadius, setAngle, angle, radius, pushCoeff }) => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);
  return (
    <>
      <tr>
        <td className="px-3">
          <NumberInput
            number={radius}
            setNumber={setRadius}
            min={0}
            className={"text-bg-secondary text-center p-1"}
            id={"radius"}
          />
        </td>
        <td className="px-3">
          <NumberInput
            number={angle}
            setNumber={setAngle}
            step={0.1}
            className={"text-bg-secondary text-center p-1"}
            id={"angle"}
          />
        </td>
        <td className="">
          <Button
            handleClick={pushCoeff}
            text="+"
            style={{ padding: "0.05rem 0.35rem" }}
            className="btn btn-outline-primary btn-sm me-2 "
            dataTooltip="adds a circle to the end of the chain"
            onMouseEnter={tooltipIn}
            onMouseLeave={tooltipOut}
          />
        </td>
      </tr>
    </>
  );
};

export default CoeffTableAdder;
