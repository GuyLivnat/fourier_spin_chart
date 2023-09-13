const ToggleSwitch = ({label, handleClick, isDisabled=false, checked=false}) => {

    return (
    <div className="form-check form-switch">
        <input
            className="form-check-input"
            type="checkbox" role="switch"
            id={"toggle-"+label}
            onClick={()=> handleClick()}
            disabled={isDisabled}
            checked={checked}/>
        <label
            className="form-check-label"
            htmlFor={"toggle-"+label}>
            {label}
        </label>
    </div>
    )
};

export default ToggleSwitch;