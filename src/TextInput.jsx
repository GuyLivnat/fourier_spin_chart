

const TextInput = ({placeholder="", setText, text, focus, accept, cancel}) => {
    const handleChange = (e) => {
        setText(e.target.value)
    }
    
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) accept();
        else if (e.keyCode === 27) cancel();
    }

return (
    <input type="text"
    className="form-control text-bg-dark"
    placeholder={placeholder} 
    onChange={handleChange} 
    value={text} 
    autoFocus={focus}
    onKeyDown={handleKeyDown}
    onBlur={cancel}
    />
)
}

export default TextInput