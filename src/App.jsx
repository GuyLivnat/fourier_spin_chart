import StarChart from './starchart/StarChart'
import './App.css'
import Button from './Button';
import timestep from './starchart/timestep';
import { useState } from 'react';
import StarChartInit from './starchart/StarChartInit';
import UploadButton from './UploadButton';
import createCoeff from './starchart/createCoeff';
import CoeffList from './CoeffList';


function App() {
  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges
  const updateSpeed = 33;  //in miliseconds. 33 is 30 fps

  let [coeff, setCoeff] = useState([]);
  let [frame, setFrame] = useState(timestep(coeff, 0));
  let [edge, setEdge] = useState([]);
  let [time, setTime] = useState(0);
  let [intervalId, setIntervalId] = useState(null);
  let [image, setImage] = useState(null);
  let [saved, setSaved] = useState(false)

  const handleFile = (event) => {   // converts an uploaded SVG to something readable // needs validation that the upload was not cancelled
      const reader = new FileReader();
      reader.onload = (e) => {
          const string = e.target.result;
          const parser = new DOMParser();
          const parsedFile = parser.parseFromString(string, "image/svg+xml");
          const path = parsedFile.querySelector("path");
          setImage(path);
          setSaved(false);
      }
      const file = event.target.files[0];
      reader.readAsText(file);
    }
    
  const handleCoeff = async() => {  // converts the uploaded file to an array of circles
    let coef = await createCoeff(image, units)
    setCoeff(coef);
    setTime(0);
    setImage(null);
  }

  const pausePlay = () => { // yes
    if (coeff.length) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId (null)
      } else {
        setIntervalId(setInterval(() => update(time), updateSpeed));
  }}};

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

  return (<>
    <div>
      <StarChartInit handleClick={pausePlay}/>
      <StarChart data = {frame} edge = {edge}/>
    </div>
    <div>
      <Button handleClick={pausePlay} text={intervalId? "pause" : "play"} isDisabled={!coeff.length}/>
      <Button handleClick={handleCoeff} text="generate" isDisabled={!image}/>
      <UploadButton handleFile={handleFile}/>
    </div>
    <div>
      <CoeffList setCoeff={setCoeff} coeff={coeff} saved={saved} setSaved={setSaved} setEdge={setEdge} setTime={setTime}/>
    </div>
  </>)
};

export default App
