import { useEffect, useState } from "react";
import FiltersInit from "./FiltersInit";
import renderFilters from "./renderFilters";
import Button from "../../general_components/Button";

const Filters = ({ coeff }) => {
  const height = 100;
  const filters = document.getElementById("filters");
  const width = filters ? filters.clientWidth : 0;
  const circles = coeff.current.filter((_, i) => i % 2 === 0 && i !== 0);
  const [flag, updateFilters] = useState(true);

  const rerender = () => {
    renderFilters(circles, height, width);
    updateFilters(!flag);
  };

  //   useEffect(() => {
  //     renderFilters(circles, height);
  //   }, []);
  return (
    <div>
      <Button handleClick={rerender} text={"update"} />
      the Filters are a wip
      <FiltersInit {...{ circles, height, width }} />
    </div>
  );
};

export default Filters;
