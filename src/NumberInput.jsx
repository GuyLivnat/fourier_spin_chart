

const NumberInput = ({placeholder, setNumber, number, focus, min, max, step}) => {
    const handleChange = (e) => {
        setNumber(e.target.value)
    }


return (
    <input type="number"
    className="form-control"
    placeholder={placeholder} 
    onChange={handleChange} 
    value={number} 
    autoFocus={focus}
    min={min}
    max={max}
    step={step}
    />
)
}

export default NumberInput;