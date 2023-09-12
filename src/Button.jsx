
const Button = ({handleClick, text, isDisabled=false, className}) => {
    return (<button
        className={className}
        onClick={handleClick}
        disabled={isDisabled} >
       {text}
    </button>)
}


export default Button;