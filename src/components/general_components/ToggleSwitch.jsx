const ToggleSwitch = ({label, handleClick, isDisabled=false, checked=false}) => {

    return (
    <div className="form-check form-switch vstack align-items-center p-0">
        <input
            className="form-check-input m-0"
            type="checkbox"
            role="switch"
            id={"toggle-"+label}
            onChange={handleClick}
            disabled={isDisabled}
            checked={checked}
        />
        <label
            className="form-check-label"
            htmlFor={"toggle-"+label}>
            {label}
        </label>
    </div>
    )
};

export default ToggleSwitch;