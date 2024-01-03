import CloseButton from "../../general_components/CloseButton";
import AngleIcon from "../../../assets/icons/AngleIcon";
import RadiusIcon from "../../../assets/icons/RadiusIcon";
import { useContext, useRef, useState } from "react";
import { TooltipContext } from "../../../contexts/TooltipContext";
import CoeffTableAdder from "./CoeffTableAdder";
import CoeffTableCell from "./CoeffTableCell";
import NumberInput from "../../general_components/NumberInput";
import CoeffTableCellEditor from "./CoeffTableCellEditor";
import "./CoeffTable.css";

const CoeffTable = ({
  coeff,
  angle,
  setAngle,
  radius,
  setRadius,
  pushCoeff,
  editCoeff,
  deleteCoeff,
  acceptEdit,
  cancelEdit,
  editNode,
  setEditNode,
  frequency,
  setFrequency,
}) => {
  const tableItems = [];
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);
  const [orderType, setOrderType] = useState("frequency");
  const [orderIsDecending, setOrderIsDecending] = useState(true);
  const orderedCeoff = coeff.current.toSorted((a, b) => {
    if (orderIsDecending) {
      return a[orderType] - b[orderType];
    } else {
      return a[orderType] + b[orderType];
    }
  });

  const reorder = (type) => {
    if (type === orderType) setOrderIsDecending(!orderIsDecending);
    else {
      setOrderIsDecending(true);
      setOrderType(type);
    }
  };

  for (let i = 0; i < orderedCeoff.length; i++) {
    tableItems.push(
      <tr key={i} id={`${i}-table-cell`}>
        {editNode.index === i && editNode.type === "r" ? (
          <CoeffTableCellEditor
            {...{
              editNode,
              setEditNode,
              acceptEdit,
              cancelEdit,
            }}
          />
        ) : (
          <CoeffTableCell
            type={"r"}
            data={orderedCeoff[i].r}
            shownLength={1}
            onDoubleClick={editCoeff}
          />
        )}
        {editNode.index === i && editNode.type === "angle" ? (
          <CoeffTableCellEditor
            {...{
              editNode,
              setEditNode,
              acceptEdit,
              cancelEdit,
            }}
          />
        ) : (
          <CoeffTableCell
            type={"angle"}
            data={orderedCeoff[i].angle}
            shownLength={2}
            onDoubleClick={editCoeff}
          />
        )}
        {editNode.index === i && editNode.type === "frequency" ? (
          <CoeffTableCellEditor
            {...{
              editNode,
              setEditNode,
              acceptEdit,
              cancelEdit,
            }}
          />
        ) : (
          <CoeffTableCell
            type={"frequency"}
            data={orderedCeoff[i].frequency}
            shownLength={0}
            onDoubleClick={editCoeff}
          />
        )}
        <td>
          <CloseButton handleClick={deleteCoeff} className="me-2" />
        </td>
      </tr>
    );
  }

  return (
    <table
      className="table table-sm table-dark table-striped table-hover mb-1"
      id="coeffTable"
      onWheel={tooltipOut}
    >
      <thead>
        <tr>
          <th scope="col" onClick={() => reorder("r")}>
            Radius <RadiusIcon />
          </th>
          <th
            scope="col"
            data-tooltip="angle in radians"
            onMouseEnter={tooltipIn}
            onMouseLeave={tooltipOut}
            onClick={() => reorder("angle")}
          >
            Angle <AngleIcon />
          </th>
          <th scope="col" onClick={() => reorder("frequency")}>
            Frequency
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{tableItems}</tbody>
      <tfoot style={{ position: "sticky", insetBlockEnd: 0 }}>
        <CoeffTableAdder
          {...{
            radius,
            setRadius,
            angle,
            setAngle,
            pushCoeff,
            frequency,
            setFrequency,
          }}
        />
      </tfoot>
    </table>
  );
};

export default CoeffTable;
