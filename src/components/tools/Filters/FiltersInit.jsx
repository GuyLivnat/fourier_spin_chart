const FiltersInit = ({ coeff }) => {
  const barsGroup = [];
  for (let i = 0; i < coeff.current.length; i++) {
    barsGroup.push(
      <g key={i + "-filters-rect"}>
        <rect id={i + "-rect"}></rect>
        <text id={i + "-rect-text"}></text>
      </g>
    );
  }

  return <svg id="filters-svg">{barsGroup}</svg>;
};

export default FiltersInit;
