import ColorInput from "../general_components/ColorInput";
import hexToRgb from "../../utilities/hexToRgb";
import rgbToHex from "../../utilities/rgbToHex";
import Button from "../general_components/Button";
import UndoIcon from "../../assets/icons/UndoIcon";
import { useContext } from "react";
import { TooltipContext } from "../../utilities/TooltipContext";
import ShownIcon from "../../assets/icons/ShownIcon";
import HideIcon from "../../assets/icons/HideIcon";

const ColorEditor = ({
  shape,
  chartColors,
  setChartColors,
  chartColorDefaults,
}) => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);
  const newColors = chartColors;

  const changeColor = (hexValue) => {
    newColors[shape] = { ...chartColors[shape], ...hexToRgb(hexValue) };
    // only changes .r.g.b values on the color object, leaving other values intact
    setChartColors({ ...newColors });
  };

  const startColor = () => {
    const rgb = chartColors[shape];
    return rgbToHex(rgb);
  };

  const resetColor = () => {
    const newColors = chartColors;
    const { r, g, b } = chartColorDefaults[shape];
    newColors[shape].r = r;
    newColors[shape].g = g;
    newColors[shape].b = b;
    setChartColors({ ...newColors });
  };

  const toggleHideShape = () => {
    if (chartColors[shape].hidden)
      newColors[shape] = { ...chartColors[shape], hidden: false };
    else newColors[shape] = { ...chartColors[shape], hidden: true };
    setChartColors({ ...newColors });
    // tooltipOut();
    // tooltipIn();
  };

  return (
    <>
      <td key={shape}>
        {shape.slice(0, 1).toUpperCase() + shape.slice(1).replace("Color", "")}
      </td>
      <td className="d-flex justify-content-center">
        <ColorInput color={startColor()} setColor={changeColor} />
      </td>
      <td>
        <Button
          className="btn btn-sm btn-outline-danger px-1 py-0"
          text={<UndoIcon size={16} />}
          handleClick={resetColor}
          dataTooltip="reset"
          onMouseEnter={tooltipIn}
          onMouseLeave={tooltipOut}
        />
      </td>
      {chartColors[shape].hidden !== undefined ? (
        <td
          data-tooltip={"toggle visibility"}
          onMouseEnter={tooltipIn}
          onMouseLeave={tooltipOut}
        >
          <Button
            className="btn btn-sm btn-outline-primary px-1 py-0"
            text={
              chartColors[shape].hidden ? (
                <HideIcon size={20} />
              ) : (
                <ShownIcon size={20} />
              )
            }
            handleClick={toggleHideShape}
          />
        </td>
      ) : (
        <td></td>
      )}
    </>
  );
};

export default ColorEditor;
