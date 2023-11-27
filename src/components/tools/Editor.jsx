import { useState } from "react";
import CoeffTable from "./CoeffTable";
import { useContext } from "react";
import { TooltipContext } from "../../utilities/TooltipContext";
import Button from "../general_components/Button";

const Editor = ({
  coeff,
  setPathName,
  saveCoeff,
  setActiveId,
  playable,
  stop,
}) => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);

  const [radius, setRadius] = useState(20);
  const [angle, setAngle] = useState(1.5707);

  const pushCoeff = () => {
    if (!coeff.current.length)
      coeff.current = [0, 0, parseFloat(radius), parseFloat(angle)];
    else coeff.current.push(parseFloat(radius), parseFloat(angle));
    setPathName("Edited at " + new Date().toLocaleString());
    setActiveId(null);
  };

  const deleteCoeff = (e) => {
    const id = parseInt(e.target.parentElement.parentElement.id);
    coeff.current = [
      ...coeff.current.slice(0, id),
      ...coeff.current.slice(id + 2),
    ];
    setPathName("Edited at " + new Date().toLocaleString());
    setActiveId(null);
  };

  const resetCoeff = () => {
    coeff.current = [0, 0];
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
          handleClick={resetCoeff}
          text="reset"
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
          lst={coeff.current}
          del={deleteCoeff}
          {...{ angle, setAngle, radius, setRadius, pushCoeff }}
        />
      </div>
    </div>
  );
};

export default Editor;
