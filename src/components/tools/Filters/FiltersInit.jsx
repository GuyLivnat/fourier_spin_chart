const FiltersInit = ({ circles, height, width }) => {
  const barsGroup = [];
  for (let i = 0; i < circles.length; i++) {
    barsGroup.push(
      <g key={i + "-filters-rect"}>
        <rect id={i + "-rect"}></rect>
        {/* <text id={i + "-rect-text"}></text> */}
      </g>
    );
  }

  return (
    <svg id="filters-svg" style={{ backgroundColor: "black" }}>
      <g
        // transform={`rotate(180) translate(${-width},${-height})`}
        transform={`scale(1,-1) translate(0,${-height})`}
        id="filter-bars-group"
      >
        {barsGroup}
      </g>
    </svg>
  );
};

export default FiltersInit;
