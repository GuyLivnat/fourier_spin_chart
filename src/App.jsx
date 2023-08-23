import StarChart from './starchart/StarChart'
import './App.css'
import Button from './Button';
import timestep from './starchart/timestep';
import { useEffect, useState } from 'react';
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
  let [radiiActive, setRadiiActive] = useState("flex")
  let [orbitsActive, setOrbitsActive] = useState("flex")
  let [outlineActive, setOutlineActive] = useState("flex")
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

  const handleFile = (event) => {   // converts an uploaded SVG to something readable // needs validation that the upload was not cancelled
      const reader = new FileReader();
      reader.onload = (e) => {
          const string = e.target.result;
          const parser = new DOMParser();
          const parsedFile = parser.parseFromString(string, "image/svg+xml");
          const path = parsedFile.querySelector("path");
          handleCoeff(path, name)
      }
      const file = event.target.files[0];
      const name = nameParser(file.name)
      reader.readAsText(file);
    }

  const nameParser = (name) => {
    return (name.replace('.svg', '') + ` with ${units} points`)
  }
    
  const handleCoeff = (path, name) => {  // converts the uploaded file to an array of circles
    let coef = createCoeff(path, units)
    saveCoeff(coef, name)
    setCoeff(coef);
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

  const saveCoeff = (coeff, name) => {
    if(coeff.length) {
      const obj = JSON.stringify({name: name, coeff: coeff});
      const id = crypto.randomUUID();
      localStorage.setItem(id, obj);
      setCoeffList([...coeffList, {name:name, id:id}])
      setActiveId(id)
    }
  }
  
  const loadCoeff = (e) => {
    const id = e.target.parentElement.id
    const obj = JSON.parse(localStorage.getItem(id));
    setCoeff(obj.coeff);
    stop();
    setActiveId(id);
  }

  const deleteCoeff = (e) => {
    const id = e.target.parentElement.id
    localStorage.removeItem(id)
    setCoeffList(coeffList.filter(item => item.id != id))
  }

  const deleteAllCoeff = () => {
    setCoeffList([])
    localStorage.clear()
  }

  const showHideOrbits = () => {
    setOrbitsActive((orbitsActive === "none")? "flex" : "none")
  };

  const showHideRadii = () => {
    setRadiiActive((radiiActive === "none")? "flex" : "none")
  }

  const showOutline = () => {
    setOutlineActive((outlineActive === "none")? "flex" : "none")
  }

  return (<>
    <div>
      <StarChartInit zoom={zoom} orbitsActive={orbitsActive} radiiActive={radiiActive} outlineActive={outlineActive}/>
      <StarChart data = {frame} edge = {edge}/>
    </div>
    <div>
      <Button handleClick={stop} text={'\u23F9'} isDisabled={!coeff.length}/>
      <Button handleClick={pausePlay} text={intervalId? '\u23F8' : "\u23F5"} isDisabled={!coeff.length}/>
    </div>
    <div>
      <Slider startValue={zoom} setValue={setZoom}/>
      <Button handleClick={showHideOrbits} text={"circles"} />
      <Button handleClick={showHideRadii} text={"radii"} />
      <Button handleClick={showOutline} text={"outline"} />
    </div>
    <div>
      <UploadButton handleFile={handleFile}/>
    </div>
    <div>
      <List lst={coeffList} load={loadCoeff} del={deleteCoeff} delAll={deleteAllCoeff} focus={activeId}/>
    </div>
  </>)
};

export default App
