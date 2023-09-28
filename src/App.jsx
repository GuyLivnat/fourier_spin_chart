import { useRef, useState } from 'react';
import CoeffToolBar from './tools/CoeffToolBar';
import ChartMain from './chart/ChartMain';
import { usePopper } from 'react-popper';
import './App.css'


function App() {

  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = useRef([]);
  const [tick, setTick] = useState(0);
  const [referenceElement,setReferenceElement] = useState(null);
  const [tooltipElement, setTooltipElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null); // for the tooltip
  const [tooltipText, setTooltipText] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, tooltipElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });
  let playable = coeff.current.length < 3;

  const stop = () => {
    document.getElementById("stopButton").click()
  }

  const toolTipIn = (e) => {
    setReferenceElement(e.target);
    setTooltipText(e.target.dataset.tooltip);
    tooltipElement.hidden = false;
    tooltipElement.style.transition = "opacity 150ms ease-out 750ms"
    tooltipElement.style.opacity  = 1;
  }

  const toolTipOut = () => {
    setReferenceElement(null);
    setTooltipText(null);
    // tooltipElement.hidden = true;
    tooltipElement.style.transition = "opacity 0ms linear 0s"
    tooltipElement.style.opacity  = 0;
  }

  return (
  <section className="container-fluid text-bg-dark">
    <div ref={setTooltipElement} style={styles.popper} {...attributes.popper} id="tooltip"  hidden className='text-bg-secondary border rounded px-2 py-1'>{tooltipText}
      <div ref={setArrowElement} style={styles.arrow} id='arrow'/>
    </div>
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
