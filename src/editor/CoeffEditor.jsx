import { useState } from "react"
import Button from "../Button";
import CoeffTable from "./CoeffTable";
import CoeffAdder from "./CoeffAdder";


const CoeffEditor = ({coeff, setCoeff}) => {

    const [radius, setRadius] = useState(0);
    const [angle, setAngle] = useState(0);

    const pushCoeff = () => {
        if(!coeff.length) setCoeff([0, 0, parseFloat(radius), parseFloat(angle)]);
        else setCoeff([...coeff, parseFloat(radius), parseFloat(angle)]);
    }
    const deleteCoeff = (e) => {
        const id = parseInt(e.target.parentElement.parentElement.id);
        setCoeff([...coeff.slice(0, id), ...coeff.slice(id+2)]);
    }
    const restCoeff = () => {
        setCoeff([0,0])
    }

    return (<>
        <h2>Editor</h2>
        <div>
            <div>
                <CoeffAdder
                setAngle={setAngle}
                setRadius={setRadius}
                radius={radius}
                angle={angle}
                />
            </div>
            <div>
                <Button
                handleClick={restCoeff}
                text="reset"
                className="btn btn-outline-primary"
                />
            </div>
            <div>
                <Button
                handleClick={pushCoeff}
                text="add"
                className="btn btn-outline-primary"
                />
            </div>
            <div className="w-10" style={{}}>
                <CoeffTable lst={coeff} del={deleteCoeff}/>
            </div>
        </div>

    </>)
}

export default CoeffEditor;