import { useState } from "react";

const useBool = () => {
    const [state, setState] = useState(true);
    console.log(1)
    const flip = () => {
        setState(!state);
    }
    return [state, flip]
}

export default useBool;