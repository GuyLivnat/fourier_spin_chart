import ColorInput from "../general_components/ColorInput";
import hexToRgb from "../../utilities/hexToRgb";
import rgbToHex from "../../utilities/rgbToHex";
import Button from "../general_components/Button";
import UndoIcon from "../../assets/icons/UndoIcon";

const ColorEditor = ({
  shape,
  chartColors,
  setChartColors,
  chartColorDefaults,
}) => {
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
        />
      </td>
    </>
  );
};

export default ColorEditor;
