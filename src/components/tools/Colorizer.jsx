import UndoIcon from "../../assets/icons/UndoIcon";
import Button from "../general_components/Button";
import Slider from "../general_components/Slider";
import ColorEditor from "./ColorEditor";

const Colorizer = ({ chartColors, setChartColors, chartColorDefaults }) => {
  const colorableShapes = [];

  const setGamma = (value) => {
    const { edgeColor } = chartColors;
    edgeColor["gamma"] = value;
    setChartColors({ ...chartColors, edgeColor });
  };

  for (const shape in chartColors) {
    colorableShapes.push(
      <tr key={shape.replace("Color", "-colorizer")}>
        <ColorEditor
          {...{ shape, chartColors, setChartColors, chartColorDefaults }}
        />
      </tr>
    );
    if (shape === "edgeColor")
      colorableShapes.push(
        <tr key="edge-gamma">
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
              handleClick={() => setGamma(0)}
            />
          </td>
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
