import CloseButton from "../../general_components/CloseButton";
import AngleIcon from "../../../assets/icons/AngleIcon";
import RadiusIcon from "../../../assets/icons/RadiusIcon";
import { useContext, useState } from "react";
import { TooltipContext } from "../../../utilities/TooltipContext";
import CoeffTableAdder from "./CoeffTableAdder";
import CoeffTableCell from "./CoeffTableCell";
import NumberInput from "../../general_components/NumberInput";
import CoeffTableCellEditor from "./CoeffTableCellEditor";

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
}) => {
  const tableItems = [];
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);

  for (let i = 2; i < coeff.current.length; ) {
    tableItems.push(
      <tr key={i} id={i}>
        {editNode.index !== i ? (
          <CoeffTableCell
            index={i}
            data={coeff.current[i++]}
            shownLength={1}
            onDoubleClick={editCoeff}
          />
        ) : (
          <CoeffTableCellEditor
            null={i++}
            {...{
              editNode,
              setEditNode,
              acceptEdit,
              cancelEdit,
            }}
          />
        )}
        {editNode.index !== i ? (
          <CoeffTableCell
            index={i}
            data={coeff.current[i++]}
            shownLength={2}
            onDoubleClick={editCoeff}
          />
        ) : (
          <CoeffTableCellEditor
            null={i++}
            {...{
              editNode,
              setEditNode,
              acceptEdit,
              cancelEdit,
            }}
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
      onWheel={tooltipOut}
    >
      <thead style={{ position: "sticky", insetBlockStart: 0 }}>
        <tr>
          <th scope="col">
            Radius <RadiusIcon />
          </th>
          <th
            scope="col"
            data-tooltip="angle in radians"
            onMouseEnter={tooltipIn}
            onMouseLeave={tooltipOut}
          >
            Angle <AngleIcon />
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{tableItems}</tbody>
      <tfoot style={{ position: "sticky", insetBlockEnd: 0 }}>
        <CoeffTableAdder
          {...{ radius, setRadius, angle, setAngle, pushCoeff }}
        />
      </tfoot>
    </table>
  );
};

export default CoeffTable;
