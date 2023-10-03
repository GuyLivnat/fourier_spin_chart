const Slider = ({value, setValue, min, max, text, disabled}) => {
    const handleChange = (e) => {
        const inputValue = parseFloat(e.target.value)
        if (setValue) setValue(inputValue);
        else value.current = inputValue;
        
    }
    return (<div className="vstack align-items-center p-0">
        <input
            type="range"
            id={text+"-slider"}
            min={min}
            max={max}
            onChange={handleChange}
            value={setValue? value: value.current}
            disabled={disabled}
            className="form-range"
        />
        <label
            htmlFor={text+"-slider"}
            className="form-label mb-1"
            style={{marginTop:-4}}>
            {text}
        </label>
    </div>)
}

export default Slider;