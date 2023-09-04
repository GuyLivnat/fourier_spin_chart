import { createRef } from 'react';
import Button from './Button';

const UploadButton = ({handleFile}) => {
    const inputRef = createRef();
    const uploadClick = () => {inputRef.current?.click()}

    return (<>
        <Button handleClick={uploadClick} text="upload svg" className={"btn btn-outline-primary mb-3"}/>
        <input type="file" onChange={handleFile} style={{ display: 'none' }} ref={inputRef}/>
        </>)
    }

export default UploadButton