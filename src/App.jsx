import StarChart from './starchart/StarChart'
import Button from './Button';
import timestep from './starchart/timestep';
import { useRef, useState } from 'react';
import StarChartInit from './starchart/StarChartInit';
import UploadButton from './UploadButton';
import createCoeff from './starchart/createCoeff';
import List from './List';
import Slider from './slider';
import ToggleSwitch from './ToggleSwitch';
import CoeffEditor from './editor/CoeffEditor';



function App() {
  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const updateSpeed = 45;  //in miliseconds. 33 is 30 fps

  const coeff = useRef([]);
  const frame = useRef(timestep(coeff, 0));
  const edge = useRef([]);
  const time = useRef(0);
  const [tick, setTick] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [activeId, setActiveId] = useState(null)
  const [zoom, setZoom] = useState(500)
  const [radiiActive, setRadiiActive] = useState("true")
  const [orbitsActive, setOrbitsActive] = useState("true")
  const [outlineActive, setOutlineActive] = useState("true")
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


  const timeTick = () => {
    setTick(time.current);
  }
      // localStorage.clear();  // use this if you mess up a save file and need to reset

  const handleFile = (event) => {   // converts an uploaded SVG to something readable // needs validation that the upload was not cancelled
    const reader = new FileReader();
    reader.onload = (e) => {
        const string = e.target.result;
        const parser = new DOMParser();
        const parsedFile = parser.parseFromString(string, "image/svg+xml");
        const path = parsedFile.querySelector("path");
        saveCoeff(path, name) // this function ends here and chains to a new function!
    }
    const file = event.target.files[0];
    const name = nameParser(file.name)
    reader.readAsText(file);
  }

  const nameParser = (name) => {
    return (name.replace('.svg', '') + ` with ${units} points`)
  }
  
  const saveCoeff = (path, name) => {
    const tempCoeff = createCoeff(path, units);
    const obj = JSON.stringify({name: name, coeff: tempCoeff});
    const id = crypto.randomUUID();
    localStorage.setItem(id, obj);
    setCoeffList([...coeffList, {name:name, id:id}])
    if (!coeff.length) { // will auto select if nothing is loaded
      setActiveId(id);
      coeff.current = tempCoeff;
    }
  }

  const pausePlay = () => {
    if (coeff.current.length) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId (null)
      } else {
        setIntervalId(setInterval(() => update(), updateSpeed));
  }}};

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId (null);
      frame.current = timestep([],0);
    }
    frame.current = timestep([], 0);
    time.current = 0;
    edge.current = [];
  }

  const update = () => {  // computes the next frame 
    const step = 1/(units*2);
    if (time.current === 1) {
      time.current = 0
    } else {
      time.current += step
    }
    frame.current = timestep(coeff.current, time.current);
    edge.current = [...edge.current, { x: frame.current.edge.x, y: frame.current.edge.y }];
    if (edge.current.length > 0.95 * units) edge.current.shift();
    timeTick();
  };
  
  const loadCoeff = (e) => {
    const id = e.target.parentElement.parentElement.id;
    const obj = JSON.parse(localStorage.getItem(id));
    coeff.current = obj.coeff;
    stop();
    setActiveId(id);
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

  const showHideOrbits = () => {
    setOrbitsActive((orbitsActive === "none")? "true" : "none")
  };

  const showHideRadii = () => {
    setRadiiActive((radiiActive === "none")? "true" : "none")
  }

  const showHideOutline = () => {
    setOutlineActive((outlineActive === "none")? "true" : "none")
  }

  return (
  <section className="container-fluid text-bg-dark">
    <div className="row">
      <div className="col-lg-5 col-md-10 col-sm-12 order-4 order-lg-5 mt-5" id="starchart" >
        <StarChartInit zoom={zoom}
          orbitsActive={orbitsActive}
          radiiActive={radiiActive}
          outlineActive={outlineActive}/>
        <StarChart data = {frame.current} edge = {edge.current}/>
        <div className="row align-items-center justify-content-start">
          <div className="col-1 m-3" id="pausePlay">
            <Button handleClick={pausePlay}
              text={intervalId? '\u23F8' : "\u23F5"}
              isDisabled={!coeff.current.length}
              className={"btn btn-primary btn-lg"}/>
            </div>
          <div className="col-1 m-2">
            <Button handleClick={stop}
              text={'\u23F9'}
              isDisabled={!coeff.current.length}
              className={"btn btn-outline-primary"}/>
          </div>
        </div>
      </div>
      <div className="col-lg-3 order-6 order-lg-4 mt-5" id="uploadList">
        <h1 className="mb-3">Images</h1>
        <div><UploadButton handleFile={handleFile} /></div>
          <List lst={coeffList}
            load={loadCoeff}
            del={deleteCoeff}
            delAll={deleteAllCoeff}
            rename={renameCoeff}
            focus={activeId}/>
      </div>
      <div className="col-md-2 order-5 order-lg-6 mt-5" id="filters">
        <h1>Tools</h1>
          <div className="col">
            <ToggleSwitch
              label={"Orbits"}
              handleClick={showHideOrbits}
              isDisabled={!coeff.current.length}
              checked={(orbitsActive === "none")? false : true}/>
          </div>
          <div>
            <ToggleSwitch
              label={"Radii"}
              handleClick={showHideRadii}
              isDisabled={!coeff.current.length}
              checked={(radiiActive === "none")? false : true}/>
          </div>
          <div className="col">
            <ToggleSwitch
              label={"Outline"}
              handleClick={showHideOutline}
              isDisabled={!coeff.current.length}
              checked={(outlineActive === "none")? false : true}/>
          </div>
          <div className="col">
            <Slider startValue={zoom} setValue={setZoom}/>
          </div>
          <CoeffEditor
            coeff={coeff}
            tick={tick}
            setTick={setTick}/>
      </div>
    </div>
  </section>)
};

export default App
