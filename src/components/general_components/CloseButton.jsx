
const CloseButton = ({handleClick, isDisabled=false}) => {
    return (
        <button type="button"
            className="btn btn-sm"
            onClick={handleClick}
            disabled={isDisabled}
            style={{color:"grey"}}>
            {"\u00d7"}
        </button>
    )
}


export default CloseButton;