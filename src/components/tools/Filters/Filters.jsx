import Button from "../../general_components/Button";
import { CoeffContext } from "../../../contexts/CoeffContext";
import { useContext, useState } from "react";
import NumberInput from "../../general_components/NumberInput";
import Slider from "../../general_components/Slider";

const Filters = () => {
  const { setFilters, coeff } = useContext(CoeffContext);

  const [lowPassSize, setLowPassSize] = useState(0);
  const [highPassSize, setHighPassSize] = useState(50000);

  const nullFilter = (coeff) => coeff;

  const lowPassFilter = (size) => {
    if (size) {
      const lowPassInner = (coeff) => coeff.filter((circle) => circle.r > size);
      return lowPassInner;
    } else return nullFilter;
  };

  const highPassFilter = (size) => {
    if (size) {
      const highPassInner = (coeff) =>
        coeff.filter((circle) => circle.r < size);
      return highPassInner;
    } else return nullFilter;
  };

  const applyFilters = () => {
    setFilters([lowPassFilter(lowPassSize), highPassFilter(highPassSize)]);
  };

  const removeFilters = () => {
    setFilters([]);
  };

  const radii = coeff.current.map((circle) => circle.r);

  return (
    <div>
      <div>
        <Slider
          value={lowPassSize}
          setValue={setLowPassSize}
          min={Math.min(...radii) - 1}
          max={Math.max(...radii)}
          text="low pass filter"
        />
      </div>
      <div>
        <Slider
          value={highPassSize}
          setValue={setHighPassSize}
          min={Math.min(...radii)}
          max={Math.max(...radii) + 1}
          text="high pass filter"
        />
      </div>
      <div>
        <Button text="apply filters" handleClick={applyFilters} />
        <Button text="hide filters" handleClick={removeFilters} />
      </div>
    </div>
  );
};

export default Filters;
