import { TooltipContext } from "../../../utilities/TooltipContext";
import { useContext } from "react";

const CoeffTableCell = ({ shownLength, index, data, onDoubleClick }) => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);
  return (
    <td
      data-tooltip={data}
      onMouseEnter={tooltipIn}
      onMouseLeave={tooltipOut}
      data-index={index}
      onDoubleClick={onDoubleClick}
    >
      {data.toFixed(shownLength)}
    </td>
  );
};

export default CoeffTableCell;
