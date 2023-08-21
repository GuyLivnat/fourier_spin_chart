import { createRef } from 'react';
import Button from './Button';

const UploadParseSVG = ({handleFile}) => {
const inputRef = createRef();
const uploadClick = () => {inputRef.current?.click()}

return (<>
<Button handleClick={uploadClick} text="upload svg"/>
<input type="file" onChange={handleFile} style={{ display: 'none' }} ref={inputRef}/>
</>)
}

export default UploadParseSVG