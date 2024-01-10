import BarGraphInit from "./BarGraphInit";
import { CoeffContext } from "../../../contexts/CoeffContext";
import { useContext, useEffect, useState } from "react";
import Slider from "../../general_components/Slider";

const Histogram = ({ spreadHistogram, height }) => {
  const { setFilters, activeId } = useContext(CoeffContext);

  const [thumbX, setThumbX] = useState(0);

  const histogramFilter = () => {
    const length = spreadHistogram.length;
    if (length) {
      const i = Math.round(thumbX * length) - 1;
      if (i) {
        const minRadius = spreadHistogram[i].radius;
        const histogramFilterInner = (coeff) =>
          coeff.filter((circle) => circle.r >= minRadius);
        setFilters([histogramFilterInner]);
      }
    }
  };

  useEffect(() => {
    if (thumbX) {
      histogramFilter();
      const screen = document.getElementById("histogram-graph-opacity-rect");
      const width = document
        .getElementById("histogram-graph-svg")
        .getAttribute("width");
      screen.setAttribute("height", height - 60);
      screen.setAttribute("width", thumbX * (width - 40));
      screen.setAttribute("y", 25);
      screen.setAttribute("fill", "var(--half-primary)");
      screen.setAttribute("x", 30);
    }
  }, [thumbX]);

  return (
    <>
      <BarGraphInit data={spreadHistogram} id="histogram" />
      <div className="ms-4 me-2">
        <Slider
          value={thumbX}
          setValue={setThumbX}
          min={0}
          max={1}
          step={0.01}
          text="Radius Filter"
        />
      </div>
    </>
  );
};

export default Histogram;
