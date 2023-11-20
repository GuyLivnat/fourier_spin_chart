import ColorInput from "../general_components/ColorInput";
import hexToRgb from "../../utilities/hexToRgb";
import rgbToHex from "../../utilities/rgbToHex";
import { useState } from "react";
import Button from "../general_components/Button";

const ColorEditor = ({ chartColors, setChartColors }) => {
  const changeColor = (shape) => {
    const key = shape + "Color";
    const newColors = chartColors;
    return (hexValue) => {
      newColors[key] = hexToRgb(hexValue);
      setChartColors({ ...newColors });
    };
  };
  const startColor = (shape) => {
    const key = shape + "Color";
    const rgb = chartColors[key];
    return rgbToHex(rgb);
  };

  return (
    <div className="rounded border">
      <div className="d-flex justify-content-around align-items-center">
        Outline
        <ColorInput color={startColor("edge")} setColor={changeColor("edge")} />
      </div>
      <div className="border-top d-flex justify-content-around align-items-center">
        Radii
        <ColorInput
          color={startColor("radii")}
          setColor={changeColor("radii")}
        />
        <Button className="btn btn-outline-primary btn-sm" text="reset" />
      </div>
      <div className="border-top d-flex justify-content-around align-items-center">
        Circles
        <ColorInput
          color={startColor("circle")}
          setColor={changeColor("circle")}
        />
      </div>
      <div className="border-top d-flex justify-content-around align-items-center">
        Background
        <ColorInput
          color={startColor("background")}
          setColor={changeColor("background")}
        />
      </div>
    </div>
  );
};

export default ColorEditor;
