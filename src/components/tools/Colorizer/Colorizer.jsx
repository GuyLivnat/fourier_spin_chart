import { useContext } from "react";
import ColorEditor from "./ColorEditor";
import OutlineFadeEditor from "./OutlineFadeEditor";
import { CoeffContext } from "../../../contexts/CoeffContext";

const Colorizer = () => {
  const { chartColors, setChartColors, chartColorDefaults } =
    useContext(CoeffContext);

  const colorableShapes = [];
  for (const shape in chartColors) {
    colorableShapes.push(
      <tr key={shape.replace("Color", "-colorizer")}>
        <ColorEditor
          {...{ shape, chartColors, setChartColors, chartColorDefaults }}
        />
      </tr>
    );
    if (shape === "outlineColor")
      colorableShapes.push(
        <tr key="outline-gamma">
          <OutlineFadeEditor
            {...{ chartColors, setChartColors, chartColorDefaults }}
          />
        </tr>
      );
  }

  return (
    <div className="rounded border overflow-hidden">
      <table className="table table-sm table-dark table-striped table-hover mb-1">
        <tbody>{colorableShapes}</tbody>
      </table>
    </div>
  );
};

export default Colorizer;
