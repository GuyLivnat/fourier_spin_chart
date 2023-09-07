const Slider = ({startValue, setValue, min, max, text}) => {
    const handleChange = (e) => {
        if (setValue)setValue(e.target.value)
        else startValue.current = e.target.value
        
    }
    return (<>
        <label htmlFor={text}>{text}</label>
        <input type="range"
            id={text}
            min={min}
            max={max}
            onChange={handleChange}
            defaultValue={setValue? startValue: startValue.current}/>
    </>)
}

export default Slider;