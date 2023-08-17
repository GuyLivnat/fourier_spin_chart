import StarChart from './d3/StarChart'
import './App.css'
import PlayPauseButton from './PlayPauseBtn';
import timestep from './d3/timestep';
import { coeff } from './../public/mockups/coeff';
import { useState } from 'react';



function App() {
  let  [frame, useFrame] = useState(timestep(coeff, 0));
  let [edge, useEdge] = useState([]);
  let [intervalId, setintervalId] = useState(null);
  let [time, setTime] = useState(0)


  const handelClick = () => {
    if (!intervalId) {
       intervalId = setInterval(() => update(time), 15);
       setintervalId(intervalId)
    } else {
      clearInterval(intervalId);
      intervalId = null;
    }};

  const update = () => {
    const step = 1/512;
    if (time === 1) {
      time = 0
    } else {
      time += step
    }
    setTime(time);
    frame = timestep(coeff, time);
    useFrame(frame);
    edge = [...edge, { x: frame.edge.x, y: frame.edge.y }];
    if (edge.length > 400) edge.shift();
    useEdge(edge)
    return
  };



  return (<>
    <StarChart data = {frame} edge = {edge}/>
    <PlayPauseButton playChart = {handelClick}/>
  </>)
};

export default App
