import { useState } from "react"
import CoeffTable from "./CoeffTable";
import CoeffAdder from "./CoeffAdder";


const CoeffEditor = ({coeff, setPathName, saveCoeff, setActiveId, playable, stop}) => {

    const [radius, setRadius] = useState(20);
    const [angle, setAngle] = useState(1.5707);

    const pushCoeff = () => {
        if(!coeff.current.length) coeff.current = [0, 0, parseFloat(radius), parseFloat(angle)];
        else coeff.current.push(parseFloat(radius), parseFloat(angle));
        setPathName('Edited at ' + new Date().toLocaleString());
        setActiveId(null);
    }

    const deleteCoeff = (e) => {
        const id = parseInt(e.target.parentElement.parentElement.id);
        coeff.current = [...coeff.current.slice(0, id), ...coeff.current.slice(id+2)];
        setPathName('Edited at ' + new Date().toLocaleString());
        setActiveId(null);
    }

    const resetCoeff = () => {
        coeff.current = [0,0];
        stop();
        setPathName('Reset at ' + new Date().toLocaleString());
        setActiveId(null);
    }

    const saveWorkingCoeff = () => {
        let date = new Date;
        saveCoeff(coeff.current, date.toLocaleString())
        setPathName('Saved as ' + new Date().toLocaleString());
    }

    return (<>
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
                    minWidth:"200px",
                    maxHeight:"200px",
                    overflowY:"auto",
                    overflowX:"clip",
                    textAlign:"center"}}
                className="border rounded">
                <CoeffTable
                    lst={coeff.current}
                    del={deleteCoeff}
                />
            </div>
    </>)
}

export default CoeffEditor;