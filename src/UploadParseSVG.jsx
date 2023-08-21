import { useState } from 'react';
import Button from './Button';

const UploadParseSVG = ({handleFile}) => {

return (<div>
<input type="file" onChange={handleFile}/>
</div>)
}

export default UploadParseSVG