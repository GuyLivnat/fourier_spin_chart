import { useState } from "react"
import CoeffTable from "./CoeffTable";
import CoeffAdder from "./CoeffAdder";


const CoeffEditor = ({coeff, setTick, tick, saveCoeff, setActiveId, playable, stop}) => {

    const [radius, setRadius] = useState(20);
    const [angle, setAngle] = useState(1.57079632679);

    const pushCoeff = () => {
        if(!coeff.current.length) coeff.current = [0, 0, parseFloat(radius), parseFloat(angle)];
        else coeff.current.push(parseFloat(radius), parseFloat(angle));
        setTick(tick+1);
        setActiveId(null);
    }

    const deleteCoeff = (e) => {
        const id = parseInt(e.target.parentElement.parentElement.id);
        coeff.current = [...coeff.current.slice(0, id), ...coeff.current.slice(id+2)];
        setTick(tick+1);
        setActiveId(null);
    }

    const resetCoeff = () => {
        coeff.current = [0,0];
        stop();
        setActiveId(null);
    }

    const saveWorkingCoeff = () => {
        let date = new Date;
        saveCoeff(coeff.current, date.toLocaleString())
    }

    return (<>
        <div style={{
            boxSizing:"content-box",
            width:"200px",
            height:"400px"}}>
            <h2>Editor</h2>
            <div >
                <CoeffAdder
                    setAngle={setAngle}
                    setRadius={setRadius}
                    radius={radius}
                    angle={angle}
                    resetCoeff={resetCoeff}
                    pushCoeff={pushCoeff}
                    save={saveWorkingCoeff}
                    playable={playable}
                />
            </div>
            <div style={{
                    boxSizing:"content-box",
                    width:"200px",
                    maxHeight:"270px",
                    overflowY:"auto",
                    overflowX:"clip",
                    textAlign:"center"}}
                className="border rounded">
                <CoeffTable
                    lst={coeff.current}
                    del={deleteCoeff}/>
            </div>
        </div>

    </>)
}

export default CoeffEditor;