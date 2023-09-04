

const TextInput = ({defaultText="", setText, text, focus, accept}) => {
    const handleChange = (e) => {
        setText(e.target.value)
    }
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') accept();
    }

return (
    <input type="text"
    className="form-control"
    placeholder={defaultText} 
    onChange={handleChange} 
    value={text} 
    autoFocus={focus}
    onKeyDown={handleKeyDown}
    />
)
}

export default TextInput