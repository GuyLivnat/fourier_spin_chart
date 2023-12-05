import { useState, createContext, useRef } from "react";

const CoeffContext = createContext();

const CoeffProvider = (props) => {
  const units = 256; // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);
  let playable = coeff.current.length > 0;
  const [activeId, setActiveId] = useState(null);
  const [coeffList, setCoeffList] = useState(() => {
    const keys = Object.keys(localStorage);
    let localCoeff = [];
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let obj = JSON.parse(localStorage.getItem(key));
      localCoeff.push({ id: key, name: obj.name });
    }
    return localCoeff;
  });

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

  const stop = () => {
    document.getElementById("stop-button").click(); // function found in ../chart/Chart.jsx
  };

  return (
    <CoeffContext.Provider
      value={{
        pathName,
        setPathName,
        chartColorDefaults,
        chartColors,
        setChartColors,
        saveCoeff,
        coeff,
        playable,
        units,
        coeffList,
        setCoeffList,
        stop,
        activeId,
        setActiveId,
      }}
    >
      {props.children}
    </CoeffContext.Provider>
  );
};

export { CoeffContext, CoeffProvider };
