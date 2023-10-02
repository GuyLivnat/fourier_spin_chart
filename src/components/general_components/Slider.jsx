const Slider = ({value, setValue, min, max, text, disabled}) => {
    const handleChange = (e) => {
        const inputValue = parseFloat(e.target.value)
        if (setValue) setValue(inputValue);
        else value.current = inputValue;
        
    }
    return (<>
        <label
            htmlFor={text}
            className="form-label">
            {text}
        </label>
        <input
            type="range"
            id={text}
            min={min}
            max={max}
            onChange={handleChange}
            value={setValue? value: value.current}
            disabled={disabled}
            className="form-range"/>
    </>)
}

export default Slider;