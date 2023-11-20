import { useRef, useState } from "react";
import ToolBar from "../components/toolbar/ToolBar";
import Chart from "../components/chart/Chart";

function ChartPage() {
  const units = 256; // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);

  const [pathName, setPathName] = useState("");
  let playable = coeff.current.length > 3;
  const [chartColors, setChartColors] = useState({
    edgeColor: { r: 172, g: 106, b: 106 },
    backgroundColor: { r: 0, g: 0, b: 0 },
    radiiColor: { r: 191, g: 194, b: 240 },
    circleColor: { r: 255, g: 255, b: 255 },
  });

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col mt-3 ms-lg-2 ms-xl-3 ms-xxl-4">
          <Chart {...{ playable, pathName, coeff, units, chartColors }} />
        </div>
        <div className="col-lg-2 order-2 mt-3" style={{ minWidth: "310px" }}>
          <ToolBar
            {...{
              playable,
              coeff,
              setPathName,
              units,
              chartColors,
              setChartColors,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default ChartPage;
