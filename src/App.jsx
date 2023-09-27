import { useRef, useState } from 'react';
import CoeffToolBar from './tools/CoeffToolBar';
import ChartMain from './chart/ChartMain';
import { usePopper } from 'react-popper';


function App() {

  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);
  const [tick, setTick] = useState(0);
  const [referenceElement,setReferenceElement] = useState(null);
  const [tooltipElement, setTooltipElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, tooltipElement, {
    modifiers: [],
  });
  let playable = coeff.current.length < 3;

  const stop = () => {
    document.getElementById("stopButton").click()
  }

  const toolTipIn = (e) => {
    setReferenceElement(e.target);
    tooltipElement.innerHTML = e.target.dataset.tooltip
    tooltipElement.removeAttribute("hidden")
  }

  const toolTipOut = () => {
    tooltipElement.setAttribute("hidden", "")
  }

  return (
  <section className="container-fluid text-bg-dark">
    {/* <ToolTip/> */}
    <div ref={setTooltipElement} style={styles.popper} {...attributes.popper} id="tooltipbox"></div>
    <div className="row">
      <ChartMain 
        coeff={coeff}
        playable={playable}
        setTick={setTick}
        units={units}/>
      <CoeffToolBar
        playable={playable}
        coeff={coeff}
        tick={tick}
        setTick={setTick}
        stop={stop}
        units={units}
        toolTipIn={toolTipIn}
        toolTipOut={toolTipOut}/>
    </div>
  </section>)
};

export default App
