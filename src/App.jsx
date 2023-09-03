import StarChart from './starchart/StarChart'
import Button from './Button';
import timestep from './starchart/timestep';
import { useState } from 'react';
import StarChartInit from './starchart/StarChartInit';
import UploadButton from './UploadButton';
import createCoeff from './starchart/createCoeff';
import List from './List';
import Slider from './slider';



function App() {
  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const updateSpeed = 45;  //in miliseconds. 33 is 30 fps

  let [coeff, setCoeff] = useState([]);
  let [frame, setFrame] = useState(timestep(coeff, 0));
  let [edge, setEdge] = useState([]);
  let [time, setTime] = useState(0);
  let [intervalId, setIntervalId] = useState(null);
  let [activeId, setActiveId] = useState(null)
  let [zoom, setZoom] = useState(500)
  let [radiiActive, setRadiiActive] = useState("true")
  let [orbitsActive, setOrbitsActive] = useState("true")
  let [outlineActive, setOutlineActive] = useState("true")
  let [coeffList, setCoeffList] = useState(() => {
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
      setCoeff(tempCoeff);
    }
  }

  const pausePlay = () => {
    if (coeff.length) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId (null)
      } else {
        setIntervalId(setInterval(() => update(time), updateSpeed));
  }}};

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId (null)
      setFrame(timestep([],0))
    }
    setFrame(timestep([], 0))
    setTime(0);
    setEdge([])
  }

  const update = () => {  // computes the next frame 
    const step = 1/(units*2);
    if (time === 1) {
      time = 0
    } else {
      time += step
    }
    frame = timestep(coeff, time);
    edge = [...edge, { x: frame.edge.x, y: frame.edge.y }];
    if (edge.length > 0.95 * units) edge.shift();
    setFrame(frame);
    setTime(time);
    setEdge(edge);
  };
  
  const loadCoeff = (e) => {
    const id = e.target.parentElement.parentElement.id
    const obj = JSON.parse(localStorage.getItem(id));
    setCoeff(obj.coeff);
    stop();
    setActiveId(id);
  }

  const deleteCoeff = (e) => {
    const id = e.target.parentElement.parentElement.id
    if (activeId === id) {
      stop();
      setCoeff([])
    };
    localStorage.removeItem(id)
    setCoeffList(coeffList.filter(item => item.id != id))
  }

  const deleteAllCoeff = () => {
    stop();
    setCoeff([]);
    setCoeffList([]);
    localStorage.clear();
  }

  const renameCoeff = (id, newName) => {
    const obj = JSON.parse(localStorage.getItem(id));
    obj.name = newName;
    const stringObj = JSON.stringify(obj);
    localStorage.setItem(id, stringObj);
    const newList = coeffList.filter(item => item.id != id);
    setCoeffList([...newList,{name:newName, id:id}])
  }

  const showHideOrbits = () => {
    setOrbitsActive((orbitsActive === "none")? "true" : "none")
  };

  const showHideRadii = () => {
    setRadiiActive((radiiActive === "none")? "true" : "none")
  }

  const showOutline = () => {
    setOutlineActive((outlineActive === "none")? "true" : "none")
  }

  return (<section className="container-fluid">
    <div className="row">
      <div className="col-lg-2"></div>
      <div className="col-lg-6 col-md-8" >
        <StarChartInit zoom={zoom} orbitsActive={orbitsActive} radiiActive={radiiActive} outlineActive={outlineActive}/>
        <StarChart data = {frame} edge = {edge}/>
        <div className="row">
          <div className="col">
            <Slider startValue={zoom} setValue={setZoom}/>
          </div>
          <div className="col">
            <Button handleClick={stop} text={'\u23F9'} isDisabled={!coeff.length} className={"btn btn-primary"}/>
          </div>
          <div className="col">
            <Button handleClick={pausePlay} text={intervalId? '\u23F8' : "\u23F5"} isDisabled={!coeff.length} className={"btn btn-primary"}/>
          </div>
          <div className="col">
            <Button handleClick={showHideOrbits} text={"circles"} className={"btn btn-primary"}/>
          </div>
          <div className="col">
            <Button handleClick={showHideRadii} text={"radii"} className={"btn btn-primary"}/>
          </div>
          <div className="col">
            <Button handleClick={showOutline} text={"outline"} className={"btn btn-primary"}/>
          </div>
        </div>
      </div>
      <div className="col">
        <UploadButton handleFile={handleFile} />
        <List lst={coeffList} load={loadCoeff} del={deleteCoeff} delAll={deleteAllCoeff} rename={renameCoeff} focus={activeId}/>
      </div>
    </div>
  </section>)
};

export default App
