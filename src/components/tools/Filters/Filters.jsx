import { useEffect } from "react";
import FiltersInit from "./FiltersInit";
import renderFilters from "./renderFilters";
import Button from "../../general_components/Button";

const Filters = ({ coeff }) => {
  const width = 286;
  const circles = coeff.current.filter((_, i) => i % 2 === 0);

  useEffect(() => {
    renderFilters(circles, width);
  }, []);
  return (
    <div>
      <Button
        handleClick={() => renderFilters(circles, width)}
        text={"update"}
      />
      this is a filters wip
      <FiltersInit {...{ coeff }} />
    </div>
  );
};

export default Filters;
