import { useState } from "react"
import TextInput from "./TextInput"
import { Button } from "bootstrap";

const CoeffEditor = ({coeff, setCoeff}) => {

    const [radius, setRadius] = useState("");
    const [angle, setAngle] = useState("");

    const moveToNextInput = (id) => {
        return null
        // focus on next text input
    }
    const pushCircle = () => {
        return null
    }

    return (<>
        <h2>Editor</h2>
        <div>
            <h3>add circle</h3>
            <div className="input-group">
                <span className="input-group-text">radus</span>
                <TextInput
                text={radius}
                setText={setRadius}
                accept={() => moveToNextInput(angle)}
                />
            </div>
            <div className="input-group">
                <span className="input-group-text">angle</span>
                <TextInput
                text={angle}
                setText={setAngle}
                accept={pushCircle}
                />
            </div>
            <div>
                {/* <Button
                handleClick={pushCircle}
                text="Add Circle"
                className="btn btn-outline-primary"/> */}
            </div>

        </div>

    </>)
}

export default CoeffEditor;