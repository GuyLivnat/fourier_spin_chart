
const CloseButton = ({handleClick, isDisabled=false}) => {
    return (<button type="button" className="btn" onClick={handleClick} disabled={isDisabled}>{"\u00d7"}</button>)
}


export default CloseButton;