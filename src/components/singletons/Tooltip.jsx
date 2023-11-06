import "./Tooltip.css";

const Tooltip = ({
  tooltipElement,
  tooltipStyles,
  tooltipAttributes,
  arrowElement,
  arrowStyles,
  tooltipText,
}) => {
  return (
    <div
      ref={tooltipElement}
      style={tooltipStyles}
      {...tooltipAttributes}
      id="tooltip"
      className="text-bg-secondary border rounded px-2 py-1"
    >
      {tooltipText}
      <div ref={arrowElement} style={arrowStyles} id="arrow" />
    </div>
  );
};

export default Tooltip;
