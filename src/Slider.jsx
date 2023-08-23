const Slider = ({startValue, setValue}) => {
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return (<>
        <label htmlFor="zoom">zoom</label>
        <input type="range" id="zoom" min={100} max={1000} onChange={handleChange} defaultValue={startValue}/>
    </>)
}

export default Slider;