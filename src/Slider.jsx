const Slider = ({value, setValue, min, max, text}) => {
    const handleChange = (e) => {
        if (setValue)setValue(parseFloat(e.target.value))
        else value.current = parseFloat(e.target.value)
        
    }
    return (<>
        <label htmlFor={text}>{text}</label>
        <input type="range"
            id={text}
            min={min}
            max={max}
            onChange={handleChange}
            value={setValue? value: value.current}/>
    </>)
}

export default Slider;