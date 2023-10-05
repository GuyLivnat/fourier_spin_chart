import { useRef, useState } from 'react';
import CoeffToolBar from './components/toolbar/CoeffToolBar';
import Chart from './components/chart/Chart';
import { TooltipProvider } from './components/general_components/TooltipWithContext';


function App() {

  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);

  const [pathName, setPathName] = useState('');
  let playable = coeff.current.length > 3;

  return (
  <section className="container-fluid text-bg-dark">
    <TooltipProvider>
    <div className="row">
      <Chart
        {...{playable,
        pathName,
        coeff,
        units}}
      />
      <CoeffToolBar
        {...{playable,
        coeff,
        setPathName,
        units}}
      />
    </div>
    </TooltipProvider>
  </section>)
};

export default App
