
const Button = ({handleClick, text, isDisabled=false}) => {
    return (<button onClick={handleClick} disabled={isDisabled} >
       {text}
    </button>)
}


export default Button;