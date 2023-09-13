
const Button = ({handleClick, text, isDisabled=false, className, id}) => {
    return (<button
        className={className}
        onClick={handleClick}
        disabled={isDisabled}
        id={id} >
       {text}
    </button>)
}


export default Button;