import { useRef, useState } from 'react';
import CoeffToolBar from './tools/CoeffToolBar';
import ChartMain from './chart/ChartMain';

import './App.css'
import ToolTip from './components/ToolTip';


function App() {

  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);
  const [tooltipTarget, setTooltipTarget] = useState(null);
  const [tooltipOutFlag, setTooltipOutFlag] = useState(false);
  const [tick, setTick] = useState(0);
  let playable = coeff.current.length < 3;

  const stop = () => {
    document.getElementById("stopButton").click()
  }

  const tooltipIn = (e) => {
    setTooltipTarget(e.target)
  }

  const tooltipOut = () => {
    setTooltipOutFlag(!tooltipOutFlag);
  }

  return (
  <section className="container-fluid text-bg-dark">
    <ToolTip
      mouseTargetIn={tooltipTarget}
      mouseFlagOut={tooltipOutFlag}
    />
    <div className="row">
      <ChartMain 
        coeff={coeff}
        playable={playable}
        setTick={setTick}
        units={units}
      />
      <CoeffToolBar
        playable={playable}
        coeff={coeff}
        tick={tick}
        setTick={setTick}
        stop={stop}
        units={units}
        tooltipIn={tooltipIn}
        tooltipOut={tooltipOut}
      />
    </div>
  </section>)
};

export default App
