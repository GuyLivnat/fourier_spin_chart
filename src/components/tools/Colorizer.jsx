import ColorEditor from "./ColorEditor";
import EdgeFadeEditor from "./EdgeFadeEditor";

const Colorizer = ({ chartColors, setChartColors, chartColorDefaults }) => {
  const colorableShapes = [];
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
          <EdgeFadeEditor
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
