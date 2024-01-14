import BarGraphInit from "./BarGraphInit";
import { CoeffContext } from "../../../contexts/CoeffContext";
import { useContext, useEffect, useState } from "react";
import Slider from "../../general_components/Slider";

const FrequencyGraph = ({ radii, width, margin }) => {
  const { updateFilters, activeId } = useContext(CoeffContext);

  const [thumb, setThumb] = useState(1);

  const moveThumb = (value) => {
    setThumb(value);
    frequencyFilter(value);
  };

  const frequencyFilter = (value) => {
    const length = radii.length;
    if (length) {
      const i = Math.round(value * length);
      if (i <= length) {
        const frequencyFilterInner = (coeff) => coeff.slice(0, i);
        updateFilters("frequency", frequencyFilterInner);
      }
    }
  };

  useEffect(() => {
    setThumb(1);
  }, [activeId]); //reset thumb when coeff changes
  return (
    <>
      <BarGraphInit
        data={radii}
        id="frequency"
        screenWidth={(1 - thumb) * (width - margin.left - margin.right)}
        screenX={margin.left + thumb * (width - margin.left - margin.right)}
      />
      <div
        style={{
          paddingLeft: "2.1rem",
          paddingRight: "0.4rem",

          margin: "0.1rem",
        }}
        className="border rounded"
      >
        <Slider
          value={thumb}
          setValue={moveThumb}
          min={0}
          max={1}
          step={1 / radii.length}
          text="Frequency Filter"
        />
      </div>
    </>
  );
};

export default FrequencyGraph;
