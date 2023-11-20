import { useRef, useState } from "react";
import CoeffToolBar from "../components/toolbar/CoeffToolBar";
import Chart from "../components/chart/Chart";

function ChartPage() {
  const units = 256; // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);

  const [pathName, setPathName] = useState("");
  let playable = coeff.current.length > 3;

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col mt-3 ms-lg-2 ms-xl-3 ms-xxl-4">
          <Chart {...{ playable, pathName, coeff, units }} />
        </div>
        <div className="col-lg-2 order-2 mt-3" style={{ minWidth: "310px" }}>
          <CoeffToolBar {...{ playable, coeff, setPathName, units }} />
        </div>
      </div>
    </section>
  );
}

export default ChartPage;
