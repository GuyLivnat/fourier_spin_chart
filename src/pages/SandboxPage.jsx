import { useRef, useState } from "react";
import ToolBar from "../components/tools/ToolBar";
import Chart from "../components/chart/Chart";

function SandboxPage() {
  const units = 256; // must be a power of 2! 256 suggested, 512 smoothes the edges\
  const coeff = useRef([]);
  let playable = coeff.current.length > 3;

  const [pathName, setPathName] = useState("");

  const chartColorDefaults = {
    outlineColor: { r: 172, g: 106, b: 106, hidden: false, gamma: 0.3 },
    backgroundColor: { r: 0, g: 0, b: 0 },
    radiiColor: { r: 191, g: 194, b: 240, hidden: false },
    circlesColor: { r: 255, g: 255, b: 255, hidden: false },
  };
  const [chartColors, setChartColors] = useState(chartColorDefaults);

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col mt-3 ms-lg-2 ms-xl-3 ms-xxl-4">
          <Chart {...{ playable, pathName, coeff, units, chartColors }} />
        </div>
        <div
          className="col-lg-2 mt-3 overflow-y-scroll"
          style={{ minWidth: "310px", maxHeight: "92vh", zIndex: "1" }}
          id="toolbar"
        >
          <ToolBar
            {...{
              playable,
              coeff,
              setPathName,
              units,
              chartColors,
              setChartColors,
              chartColorDefaults,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default SandboxPage;
