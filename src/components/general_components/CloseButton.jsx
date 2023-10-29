
const CloseButton = ({handleClick, isDisabled=false, className}) => {
    return (
        <button type="button"
            className={"btn btn-sm " + className}
            onClick={handleClick}
            disabled={isDisabled}
            style={{color:"grey", padding: '0.05rem 0.35rem'}}>
            {"\u00d7"}
        </button>
    )
}


export default CloseButton;