import { usePopper } from 'react-popper';
import { useState } from 'react';
import './ToolTip.css'

const ToolTip = ({mouseTargetIn, mouseFlagOut}) => {

    const [targetElement, setTargetElement] = useState(null);
    const [flagTarget, setFlagTarget] = useState(false);
    const [referenceElement,setReferenceElement] = useState(null);
    const [tooltipElement, setTooltipElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null); // for the tooltip
    const [tooltipText, setTooltipText] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, tooltipElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

    const toolTipIn = (target) => {
        setReferenceElement(target);
        setTooltipText(target.dataset.tooltip);
        tooltipElement.style.transition = "opacity 150ms ease-out 1s"
        tooltipElement.style.opacity  = 1;
        tooltipElement.style.visibility  = 'visible';
    }
    
    const toolTipOut = () => {
        setReferenceElement(null);
        setTooltipText(null);
        tooltipElement.style.transition = "opacity 0ms linear 0s"
        tooltipElement.style.opacity  = 0;
    }

    if (mouseFlagOut !== flagTarget) {
        toolTipOut();
        setFlagTarget(!flagTarget)
      }
    if ((mouseTargetIn !== targetElement)) {
        setTargetElement(mouseTargetIn);
        if (mouseTargetIn) toolTipIn(mouseTargetIn);
      }  
    if(tooltipElement && (tooltipElement.dataset.popperReferenceHidden === "true")) {
            tooltipElement.style.transition = "opacity 0ms linear 0s"
            tooltipElement.style.opacity  = 0;


    };
    

    return (
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
    )
}

export default ToolTip;