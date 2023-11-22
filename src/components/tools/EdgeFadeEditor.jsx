import Button from "../general_components/Button";
import UndoIcon from "../../assets/icons/UndoIcon";
import Slider from "../general_components/Slider";
import { useContext } from "react";
import { TooltipContext } from "../../utilities/TooltipContext";

const EdgeFadeEditor = ({
  chartColors,
  setChartColors,
  chartColorDefaults,
}) => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);

  const setGamma = (value) => {
    const { edgeColor } = chartColors;
    edgeColor["gamma"] = value;
    setChartColors({ ...chartColors, edgeColor });
  };

  return (
    <>
      <td>Edge Fade</td>
      <td>
        <Slider
          value={chartColors.edgeColor.gamma}
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
          handleClick={() => setGamma(chartColorDefaults.edgeColor.gamma)}
          dataTooltip="reset Fade"
          onMouseEnter={tooltipIn}
          onMouseLeave={tooltipOut}
        />
      </td>
    </>
  );
};

export default EdgeFadeEditor;
