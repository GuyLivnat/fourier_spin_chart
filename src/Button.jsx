
const Button = ({handelClick, text}) => {
    return (<button onClick={handelClick}>
       {text}
    </button>)
}


export default Button;