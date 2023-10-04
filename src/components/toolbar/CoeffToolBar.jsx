import {useState} from 'react'
import CoeffEditor from './editor/CoeffEditor';
import CoeffList from './CoeffList';
import CollapseTitle from '../general_components/CollapseTitle';


const CoeffToolBar = ({coeff, playable, tick, setTick, units}) => {
    const [activeId, setActiveId] = useState(null);
    const [coeffList, setCoeffList] = useState(() => {
        const keys = Object.keys(localStorage);
        let localCoeff = [];
        for(let i=0; i < keys.length; i++) {
          let key = keys[i];
          let obj = JSON.parse(localStorage.getItem(key));
          localCoeff.push({id:key, name:obj.name});
        }
        return localCoeff;
      })

    const stop = () => {
        if (playable) {
            document.getElementById("stopButton").click() // function found in ../chart/Chart.jsx
        }
    }

    const saveCoeff = (coeffs, name) => {
        const obj = JSON.stringify({name: name, coeff: coeffs});
        const id = crypto.randomUUID();
        localStorage.setItem(id, obj);
        setCoeffList([...coeffList, {name:name, id:id}])
        if (!coeff.current.length) { // will auto select if nothing is loaded
            setActiveId(id);
            coeff.current = coeffs;
            setTick(tick+1)
        }
      }
    return (
<div
    className="col-lg-2 order-2 mt-5"
    style={{minWidth:"310px"}}>
        <CollapseTitle
            title="Saved Paths"
            forBody="uploads"/>
        <div
            className='collapse' id='uploads'>
            <CoeffList
                activeId={activeId}
                setActiveId={setActiveId}
                coeffList={coeffList}
                setCoeffList={setCoeffList}
                saveCoeff={saveCoeff}
                units={units}
                tick={tick}
                setTick={setTick}
                coeff={coeff}
                stop={stop}/>
        </div>
            <CollapseTitle
                title="Editor"
                forBody="editor"/>
        <div
            className='collapse'
            id='editor'>
            <CoeffEditor
                playable={playable}
                coeff={coeff}
                tick={tick}
                setTick={setTick}
                saveCoeff={saveCoeff}
                setActiveId={setActiveId}
                stop={stop}
            />
        </div>
    </div>
    )
};

export default CoeffToolBar;