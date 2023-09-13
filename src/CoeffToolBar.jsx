import {useState} from 'react'
import createCoeff from './utilities/createCoeff';
import List from './List';
import CoeffEditor from './editor/CoeffEditor';


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

    // localStorage.clear();  // use this if you mess up a save file and need to reset

    const loadCoeff = (e) => {
        const id = e.target.parentElement.parentElement.id;
        const obj = JSON.parse(localStorage.getItem(id));
        coeff.current = obj.coeff;
        stop();
        setActiveId(id);
        setTick(tick+1)
    }

    const deleteCoeff = (e) => {
        const id = e.target.parentElement.parentElement.id;
        if (activeId === id) {
            stop();
            coeff.current = [];
        };
        localStorage.removeItem(id)
        setCoeffList(coeffList.filter(item => item.id != id))
    }

    const deleteAllCoeff = () => {
        stop();
        coeff.current = [];
        setCoeffList([]);
        localStorage.clear();
    }

    const renameCoeff = (id, newName) => {
        const obj = JSON.parse(localStorage.getItem(id));
        obj.name = newName;
        const stringObj = JSON.stringify(obj);
        localStorage.setItem(id, stringObj);
        const newList = coeffList.map((item) => {
            if (item.id === id) return {name:newName, id:id}
            else return item;
        });
        setCoeffList(newList)
    }

    const uploadSVG = (event) => {   // converts an uploaded SVG to something readable 
        const file = event.target.files[0];
        if (file) {
          const name = nameParser(file.name)
          const reader = new FileReader();
          reader.onload = (e) => {
              const string = e.target.result;
              const parser = new DOMParser();
              const parsedFile = parser.parseFromString(string, "image/svg+xml");
              const path = parsedFile.querySelector("path");
              const coeff = createCoeff(path, units);
              saveCoeff(coeff, name) // this function ends here and chains to a new function!
          }
          reader.readAsText(file);
        };
      }
    
    const nameParser = (name) => {
        return (name.replace('.svg', '') + ` with ${units} points`)
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
        <List
            lst={coeffList}
            load={loadCoeff}
            del={deleteCoeff}
            delAll={deleteAllCoeff}
            rename={renameCoeff}
            focus={activeId}
            upload={uploadSVG}
            uploadText={"upload svg"}/>
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