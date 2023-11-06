import { useRef, useState } from 'react';
import CoeffToolBar from '../toolbar/CoeffToolBar';
import Chart from './Chart';


function ChartPage() {

  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);

  const [pathName, setPathName] = useState('');
  let playable = coeff.current.length > 3;

  return (
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
    )
};

export default ChartPage