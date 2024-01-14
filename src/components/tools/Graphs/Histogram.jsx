import BarGraphInit from "./BarGraphInit";
import { CoeffContext } from "../../../contexts/CoeffContext";
import { useContext, useEffect, useState } from "react";
import Slider from "../../general_components/Slider";

const Histogram = ({ spreadHistogram, width, histogramMargin }) => {
  const { updateFilters, activeId } = useContext(CoeffContext);

  const [histogramThumb, setHistogramThumb] = useState(0);

  const histogramFilter = (value) => {
    const length = spreadHistogram.length;
    if (length) {
      const i = Math.round(value * length) - 1;
      if (i > 0) {
        const minRadius = spreadHistogram[i].radius;
        const histogramFilterInner = (coeff) =>
          coeff.filter((circle) => circle.r >= minRadius);
        updateFilters("histogram", histogramFilterInner);
      }
    }
  };

  const moveThumb = (value) => {
    setHistogramThumb(value);
    histogramFilter(value);
  };

  useEffect(() => {
    setHistogramThumb(0);
  }, [activeId]); //reset thumb when coeff changes

  return (
    <>
      <BarGraphInit
        data={spreadHistogram}
        id="histogram"
        screenWidth={
          histogramThumb *
          (width - histogramMargin.left - histogramMargin.right)
        }
      />
      <div className="ms-4 me-2">
        <Slider
          value={histogramThumb}
          setValue={moveThumb}
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
