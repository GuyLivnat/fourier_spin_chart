import { useState } from "react"
import Button from "../Button";
import CoeffTable from "./CoeffTable";
import CoeffAdder from "./CoeffAdder";


const CoeffEditor = ({coeff, setTick, tick}) => {

    const [radius, setRadius] = useState(0);
    const [angle, setAngle] = useState(0);

    const pushCoeff = () => {
        if(!coeff.current.length) coeff = [0, 0, parseFloat(radius), parseFloat(angle)];
        else coeff.current = [...coeff.current, parseFloat(radius), parseFloat(angle)];
        setTick(tick+1);
    }
    const deleteCoeff = (e) => {
        const id = parseInt(e.target.parentElement.parentElement.id);
        coeff.current = [...coeff.current.slice(0, id), ...coeff.current.slice(id+2)];
        setTick(tick+1);
    }
    const resetCoeff = () => {
        coeff.current = [0,0];
        setTick(tick+1);

    }

    return (<>
        <div style={{boxSizing:"content-box", width:"200px", height:"400px"}}>
            <h2>Editor</h2>
            <div >
                <CoeffAdder
                setAngle={setAngle}
                setRadius={setRadius}
                radius={radius}
                angle={angle}
                resetCoeff={resetCoeff}
                pushCoeff={pushCoeff}
                />
            </div>
            <div style={{boxSizing:"content-box", width:"200px", height:"300px", overflowY:"scroll", overflowX:"clip", textAlign:"center"}}>
                <CoeffTable lst={coeff.current} del={deleteCoeff}/>
            </div>
        </div>

    </>)
}

export default CoeffEditor;