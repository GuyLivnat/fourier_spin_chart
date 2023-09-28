import { usePopper } from 'react-popper';
import { useState, usEffect, useEffect, useRef } from 'react';
import './ToolTip.css'

const ToolTip = () => {

    const [referenceElement,setReferenceElement] = useState(null);
    const [tooltipElement, setTooltipElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null); // for the tooltip
    const [tooltipText, setTooltipText] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, tooltipElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

    
    const totalTooltips = document.querySelectorAll('[data-tooltip]').length;

    useEffect(() => {
        const elements =  document.querySelectorAll('[data-tooltip]');
        elements
        .forEach((element) => {
            if (typeof element.mouseenter !== 'toolTipIn') {
                element.addEventListener('mouseenter', (e) => toolTipIn(e.target))
                element.addEventListener('mouseleave', () => toolTipOut())
            }
        })
        return () => {
            elements
            .forEach((element) => {
                element.removeEventListener('mouseenter', (e) => toolTipIn(e.target))
                element.removeEventListener('mouseleave', () => toolTipOut())
            })
        };
    }, [totalTooltips]);

    const toolTipIn = (target) => {
        setReferenceElement(target);
        setTooltipText(target.dataset.tooltip);
        const tooltip = document.getElementById('tooltip')
        tooltip.style.transition = "opacity 150ms ease-out 1s"
        tooltip.style.opacity  = 1;
        tooltip.style.visibility  = 'visible';
    }
    
    const toolTipOut = () => {
        setReferenceElement(null);
        setTooltipText(null);
        const tooltip = document.getElementById('tooltip')
        tooltip.style.transition = "opacity 0ms linear 0s"
        tooltip.style.opacity  = 0;
    }
    
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