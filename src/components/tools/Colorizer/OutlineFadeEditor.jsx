import Button from "../../general_components/Button";
import UndoIcon from "../../../assets/icons/UndoIcon";
import Slider from "../../general_components/Slider";
import { useContext } from "react";
import { TooltipContext } from "../../../utilities/TooltipContext";

const OutlineFadeEditor = ({
  chartColors,
  setChartColors,
  chartColorDefaults,
}) => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);

  const setGamma = (value) => {
    const { outlineColor } = chartColors;
    outlineColor["gamma"] = value;
    setChartColors({ ...chartColors, outlineColor });
  };

  return (
    <>
      <td>Fade</td>
      <td>
        <Slider
          value={chartColors.outlineColor.gamma}
          setValue={setGamma}
          min={-1}
          max={1}
          step={0.1}
        />
      </td>
      <td>
        <Button
          text={<UndoIcon size={16} />}
          className="btn btn-sm btn-outline-danger px-1 py-0"
          handleClick={() => setGamma(chartColorDefaults.outlineColor.gamma)}
          dataTooltip="reset"
          onMouseEnter={tooltipIn}
          onMouseLeave={tooltipOut}
        />
      </td>
    </>
  );
};

export default OutlineFadeEditor;
