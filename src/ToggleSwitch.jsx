const ToggleSwitch = ({label, handleClick, isDisabled=false}) => {

    return (
    <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id={"toggle"+label} onClick={()=> handleClick()} disabled={isDisabled}/>
        <label className="form-check-label" htmlFor={"toggle-"+label}>{label}</label>
    </div>
    )
};

export default ToggleSwitch;