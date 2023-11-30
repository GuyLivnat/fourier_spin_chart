const BarGraphInit = ({ data, id }) => {
  const barsGroup = [];
  for (let i = 0; i < data.length; i++) {
    barsGroup.push(<rect key={i + "-graph-rect"}></rect>);
  }

  return (
    <svg id={`${id}-graph-svg`} style={{ backgroundColor: "black" }}>
      <g>{barsGroup}</g>
      <g id={`${id}-graph-y-lable`}></g>
      <g id={`${id}-graph-x-lable`}>
        <text></text>
      </g>
    </svg>
  );
};

export default BarGraphInit;
