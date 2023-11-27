const Button = ({
  handleClick,
  text,
  isDisabled = false,
  className,
  id,
  img,
  imgAlt,
  dataTooltip,
  onMouseEnter,
  onMouseLeave,
  style,
}) => {
  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={isDisabled}
      id={id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-tooltip={dataTooltip}
      style={style}
      type="button"
    >
      {img && <img src={img} alt={imgAlt} />}
      {text}
    </button>
  );
};

export default Button;
