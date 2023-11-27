const NumberInput = ({
  setNumber,
  number,
  autoFocus,
  step,
  className,
  id,
  accept,
  cancel,
}) => {
  const handleChange = (e) => {
    const regexNumber = /-?(\d+).?(\d*)/;
    const value = e.target.value.match(regexNumber);
    if (value) setNumber(value[0]);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && accept) accept(); // enter/return
    else if (e.keyCode === 27 && cancel) cancel(); // esc
  };

  return (
    <input
      onKeyDown={handleKeyDown}
      type="number"
      className={"form-control " + className}
      onChange={handleChange}
      value={number}
      autoFocus={autoFocus}
      step={step}
      id={id}
      onBlur={accept}
    />
  );
};

export default NumberInput;
