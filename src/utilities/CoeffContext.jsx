import { usePopper } from "react-popper";
import { useState, createContext, useRef } from "react";
import Tooltip from "../components/singletons/Tooltip";

const CoeffContext = createContext();

const CoeffProvider = (props) => {
  const units = 256; // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);
  let playable = coeff.current.length > 3;

  const [pathName, setPathName] = useState("");

  const chartColorDefaults = {
    outlineColor: { r: 172, g: 106, b: 106, hidden: false, gamma: 0.3 },
    backgroundColor: { r: 0, g: 0, b: 0 },
    radiiColor: { r: 191, g: 194, b: 240, hidden: false },
    circlesColor: { r: 255, g: 255, b: 255, hidden: false },
  };
  const [chartColors, setChartColors] = useState(chartColorDefaults);

  const saveCoeff = (coeffs, name) => {
    const obj = JSON.stringify({ name: name, coeff: coeffs });
    const id = crypto.randomUUID();
    localStorage.setItem(id, obj);
    setCoeffList([...coeffList, { name: name, id: id }]);
    if (!coeff.current.length || name === new Date().toLocaleString()) {
      // nothing is loaded || new coeffs saved => load
      setActiveId(id);
      coeff.current = coeffs;
      setPathName(name);
    }
  };

  return (
    <CoeffContext.Provider value={{ tooltipIn, tooltipOut }}>
      {props.children}
    </CoeffContext.Provider>
  );
};

export { CoeffContext, CoeffProvider };
