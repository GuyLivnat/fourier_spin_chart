import { usePopper } from 'react-popper';
import { useState, createContext, useRef} from 'react';
import './Tooltip.css'

const TooltipContext = createContext();

const TooltipProvider = (props) => {

    const clearTooltipId = useRef(null)
    const tooltip = document.getElementById('tooltip');

    const [referenceElement,setReferenceElement] = useState(null);
    const [tooltipElement, setTooltipElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [tooltipText, setTooltipText] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, tooltipElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });


    const tooltipIn = (e) => {
        clearTooltipId.current = setTimeout(() => {
            setReferenceElement(e.target);
            setTooltipText(e.target.dataset.tooltip);
            tooltip.style.transition = "opacity 100ms ease-out 1s";
            tooltip.style.opacity  = 1;
            tooltip.style.visibility  = 'visible';
        }, 300)
    }
    
    const tooltipOut = () => {
        clearTimeout(clearTooltipId.current);

        setReferenceElement(null);
        setTooltipText(null);
        tooltip.style.transition = "opacity 0ms linear 0s";
        tooltip.style.opacity  = 0;
        tooltip.style.visibility  = 'hidden';
    }
    
    return (<TooltipContext.Provider value={{tooltipIn, tooltipOut}}>
        <div
            ref={setTooltipElement}
            style={styles.popper}
            {...attributes.popper}
            id="tooltip"
            className='text-bg-secondary border rounded px-2 py-1'
        >
            {tooltipText}
            <div
                ref={setArrowElement}
                style={styles.arrow} 
                id='arrow'
            />
        </div>
        {props.children}
        </TooltipContext.Provider>)
}

export {TooltipContext, TooltipProvider};