const TextInput = ({defaultText="", setText, text}) => {
    const handleChange = (e) => {
        setText(e.target.value)
    }
return (<input type="text" placeholder={defaultText} onChange={handleChange} maxLength={20} value={text}/>)
}

export default TextInput