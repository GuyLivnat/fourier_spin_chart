import { useState } from "react";

const useBool = (init=true) => {
    const [bool, setBool] = useState(init);

    const flip = () => setBool(!bool)

    return [bool, flip]
}

export default useBool;