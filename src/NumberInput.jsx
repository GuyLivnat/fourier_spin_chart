

const NumberInput = ({placeholder, setNumber, number, focus, min, max, step, className, id}) => {
    const handleChange = (e) => {
        setNumber(e.target.value)
    }


return (
    <input
        type="number"
        className={"form-control " + className}
        placeholder={placeholder} 
        onChange={handleChange} 
        value={number} 
        autoFocus={focus}
        min={min}
        max={max}
        step={step}
        id={id}
    />
)
}

export default NumberInput;