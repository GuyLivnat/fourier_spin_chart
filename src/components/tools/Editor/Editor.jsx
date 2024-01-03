import { useState, useContext } from "react";
import CoeffTable from "./CoeffTable";
import { TooltipContext } from "../../../contexts/TooltipContext";
import Button from "../../general_components/Button";
import { CoeffContext } from "../../../contexts/CoeffContext";

const Editor = () => {
  const { coeff, setPathName, saveCoeff, setActiveId, playable, stop } =
    useContext(CoeffContext);
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);

  const nullNode = { value: null, index: null, type: null };
  const [editNode, setEditNode] = useState(nullNode);
  const [radius, setRadius] = useState(0);
  const [angle, setAngle] = useState(0);
  const [frequency, setFrequency] = useState(0);

  const editCoeff = (e) => {
    tooltipOut();
    const value = parseFloat(e.target.dataset.tooltip);
    const index = parseInt(e.target.parentElement.id);
    const type = e.target.dataset.type;
    setEditNode({ ...{ value, index, type } });
  };

  const cancelEdit = () => {
    setEditNode(nullNode);
  };

  const acceptEdit = () => {
    coeff.current[editNode.index][editNode.type] = parseFloat(editNode.value);
    setActiveId(crypto.randomUUID());
    setPathName("Edited at " + new Date().toLocaleString());
    setEditNode(nullNode);
  };

  const pushCoeff = () => {
    const frequency =
      coeff.current.length > 0
        ? coeff.current[coeff.current.length - 1].frequency + 1
        : 1;
    coeff.current.push({
      r: parseFloat(radius),
      angle: parseFloat(angle),
      frequency: frequency,
    });
    setPathName("Edited at " + new Date().toLocaleString());
    setActiveId(crypto.randomUUID());
  };

  const deleteCoeff = (e) => {
    const id = parseInt(e.target.parentElement.parentElement.id);
    coeff.current = [
      ...coeff.current.slice(0, id),
      ...coeff.current.slice(id + 1),
    ];
    setPathName("Edited at " + new Date().toLocaleString());
    setActiveId(crypto.randomUUID());
  };

  const clearCoeff = () => {
    coeff.current = [];
    stop();
    setPathName("Reset at " + new Date().toLocaleString());
    setActiveId(null);
  };

  const saveWorkingCoeff = () => {
    let date = new Date();
    saveCoeff(coeff.current, date.toLocaleString());
    setPathName("Saved as " + new Date().toLocaleString());
  };

  return (
    <div className="rounded border overflow-hidden">
      <div className="row justify-content-between mx-0">
        <Button
          handleClick={saveWorkingCoeff}
          text="save"
          className="btn btn-outline-primary m-1 col"
          isDisabled={!playable}
          dataTooltip="saves the circle chain with the current time as its name"
          onMouseEnter={tooltipIn}
          onMouseLeave={tooltipOut}
        />
        <Button
          handleClick={clearCoeff}
          text="clear"
          className="btn btn-outline-danger m-1 col"
          dataTooltip="removes all the circles"
          onMouseEnter={tooltipIn}
          onMouseLeave={tooltipOut}
        />
      </div>
      <div
        style={{
          boxSizing: "content-box",
          minWidth: "200px",
          maxHeight: "250px",
          overflowY: "auto",
          overflowX: "clip",
          textAlign: "center",
        }}
        className="border-top"
      >
        <CoeffTable
          {...{
            angle,
            setAngle,
            radius,
            setRadius,
            pushCoeff,
            deleteCoeff,
            coeff,
            editCoeff,
            cancelEdit,
            acceptEdit,
            editNode,
            setEditNode,
            frequency,
            setFrequency,
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
