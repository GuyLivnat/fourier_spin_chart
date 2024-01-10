import { TooltipContext } from "../../../contexts/TooltipContext";
import { useContext } from "react";

const BarGraphInit = ({ data, id }) => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);
  const barsGroup = [];
  for (let i = 0; i < data.length; i++) {
    barsGroup.push(
      <rect
        key={i + "-graph-rect"}
        pointerEvents={"all"}
        onMouseEnter={tooltipIn}
        onMouseLeave={tooltipOut}
      ></rect>
    );
  }

  return (
    <svg id={`${id}-graph-svg`} style={{ backgroundColor: "black" }}>
      <g id={`${id}-graph-rect-group`}>{barsGroup}</g>
      <rect id={`${id}-graph-opacity-rect`}></rect>
      <g id={`${id}-graph-y-lable`}></g>
      <g id={`${id}-graph-x-lable`}>
        <text></text>
      </g>
    </svg>
  );
};

export default BarGraphInit;
