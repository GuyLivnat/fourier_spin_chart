import { TooltipContext } from "../../../contexts/TooltipContext";
import { useContext } from "react";

const CoeffTableCell = ({ shownLength, type, data, onDoubleClick }) => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);
  return (
    <td
      data-tooltip={data}
      onMouseEnter={tooltipIn}
      onMouseLeave={tooltipOut}
      data-type={type}
      onDoubleClick={onDoubleClick}
    >
      {data.toFixed(shownLength)}
    </td>
  );
};

export default CoeffTableCell;
