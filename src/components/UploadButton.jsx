import { createRef } from 'react';
import Button from './Button';

const UploadButton = ({handleFile, text, className}) => {
    const inputRef = createRef();
    const uploadClick = () => {inputRef.current?.click()}

    return (<>
        <Button
            handleClick={uploadClick}
            text={text}
            className={className}/>
        <input
            type="file"
            onChange={handleFile}
            style={{ display: 'none' }}
            ref={inputRef}/>
        </>)
    }

export default UploadButton