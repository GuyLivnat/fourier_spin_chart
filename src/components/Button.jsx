
const Button = ({handleClick, text, isDisabled=false, className, id, img, imgAlt}) => {
    return (
        <button
            className={className}
            onClick={handleClick}
            disabled={isDisabled}
            id={id} 
            type="button">
            {img && <img src={img} alt={imgAlt}/>}
            {text}
        </button>
    )
}


export default Button;