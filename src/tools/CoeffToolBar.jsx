import {useState} from 'react'

import CoeffEditor from './editor/CoeffEditor';
import CoeffList from './CoeffList';


const CoeffToolBar = ({coeff, playable, tick, setTick, stop, units}) => {
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
        <div className='row'>
            <h2 className='col'>Images</h2>
            <div className='col align-items-start justify-content-middle'>
                <button
                className='btn btn-outline-primary btn-sm'
                data-bs-toggle='collapse'
                type='button'
                data-bs-target='#uploads'
                aria-expanded='false'
                aria-controls='$uploads'
                >{"\u25bc"}
                </button>
            </div>
        </div>
        <div className='collapse' id='uploads'>
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
        <div
            className=""
            style={{
            boxSizing:"content-box",
            maxHeight:"400px"}}>
            <h2>Editor</h2>
            <CoeffEditor
                playable={playable}
                coeff={coeff}
                tick={tick}
                setTick={setTick}
                saveCoeff={saveCoeff}
                setActiveId={setActiveId}
                stop={stop}/>
        </div>
    </div>
    )
};

export default CoeffToolBar;