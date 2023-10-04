import { useRef, useState } from 'react';
import CoeffToolBar from './components/toolbar/CoeffToolBar';
import Chart from './components/chart/Chart';
import { TooltipProvider } from './components/general_components/TooltipWithContext';
import useBool from './utilities/useBool';


function App() {

  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);

  const [_, refresh] = useBool();
  let playable = coeff.current.length > 3;

  return (
  <section className="container-fluid text-bg-dark">
    <TooltipProvider>
    <div className="row">
      <Chart
        playable={playable}
        coeff={coeff}
        units={units}
      />
      <CoeffToolBar
        playable={playable}
        coeff={coeff}
        refresh={refresh}
        units={units}
      />
    </div>
    </TooltipProvider>
  </section>)
};

export default App
