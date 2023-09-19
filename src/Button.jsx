
const Button = ({handleClick, text, isDisabled=false, className, id}) => {
    return (
        <button
            className={className}
            onClick={handleClick}
            disabled={isDisabled}
            id={id} 
            type="button">
            {text}
        </button>
    )
}


export default Button;