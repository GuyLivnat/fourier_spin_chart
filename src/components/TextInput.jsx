

const TextInput = ({placeholder="", setText, text, focus, accept, cancel, id}) => {
    const handleChange = (e) => {
        setText(e.target.value)
    }
    
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) accept();
        else if (e.keyCode === 27) cancel();
    }

return (
    <input
        type="text"
        name={text}
        className="text-bg-dark"
        placeholder={placeholder} 
        onChange={handleChange} 
        value={text} 
        autoFocus={focus}
        onKeyDown={handleKeyDown}
        style={{padding:0, paddingLeft:"1px",border:0}}
        id={id}
    />
)
}

export default TextInput