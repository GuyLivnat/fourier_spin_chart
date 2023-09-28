import { useState } from "react"
import CoeffTable from "./CoeffTable";
import CoeffAdder from "./CoeffAdder";


const CoeffEditor = ({coeff, setTick, tick, saveCoeff, setActiveId, playable, stop, tooltipIn, tooltipOut}) => {

    const [radius, setRadius] = useState(20);
    const [angle, setAngle] = useState(1.5707);

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
                    tooltipIn={tooltipIn}
                    tooltipOut={tooltipOut}
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
                    tooltipIn={tooltipIn}
                    tooltipOut={tooltipOut}
                />
            </div>
    </>)
}

export default CoeffEditor;