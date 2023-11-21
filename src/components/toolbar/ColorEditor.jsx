import ColorInput from "../general_components/ColorInput";
import hexToRgb from "../../utilities/hexToRgb";
import rgbToHex from "../../utilities/rgbToHex";
import Button from "../general_components/Button";

const ColorEditor = ({
  shape,
  chartColors,
  setChartColors,
  chartColorDefaults,
}) => {
  const changeColor = () => {
    const newColors = chartColors;
    return (hexValue) => {
      newColors[shape] = hexToRgb(hexValue);
      setChartColors({ ...newColors });
    };
  };
  const startColor = () => {
    const rgb = chartColors[shape];
    return rgbToHex(rgb);
  };

  const resetColor = () => {
    const newColors = chartColors;
    const defaultColor = chartColorDefaults[shape];
    newColors[shape] = defaultColor;
    setChartColors({ ...newColors });
  };

  return (
    <>
      <td key={shape}>
        {shape.slice(0, 1).toUpperCase() + shape.slice(1).replace("Color", "")}
      </td>
      <td>
        <ColorInput color={startColor(shape)} setColor={changeColor(shape)} />
      </td>
      <td>
        <Button
          className="btn btn-sm btn-outline-primary"
          text="reset"
          handleClick={resetColor}
        />
      </td>
    </>
  );
};

export default ColorEditor;
