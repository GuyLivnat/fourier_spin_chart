import StarChart from './starchart/StarChart'
import './App.css'
import Button from './Button';
import timestep from './starchart/timestep';
import { mockCoeff } from './../public/mockups/coeff';
import { useState } from 'react';
import { mushuPoints2 } from '../public/mockups/mushPoints2';
import mushuPoints3 from '../public/mockups/mushPoints3';
import FFT from 'fft.js';
import transformRadix2 from './starchart/fft';
import StarChartInit from './starchart/StarChartInit';



function App() {
  let [coeff, setCoeff] = useState(mockCoeff);
  let [frame, setFrame] = useState(timestep(coeff, 0));
  let [edge, setEdge] = useState([]);
  let [intervalId, setIntervalId] = useState(null);
  let [time, setTime] = useState(0);


  const updateCoeff = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId (null)}; //pause!
    setEdge([]); //empty edge points


    // const fft = new FFT(256);
    // const out = fft.createComplexArray();
    // const data = fft.toComplexArray(mushuPoints2)
    // const test = fft.transform(out, data)

    let real = [];
    let img = [];
    for (let i=0; i<64; i++) {
      real.push(0);
      img.push(i*4);
    }
    for (let i=0; i<64; i++) {
      real.push(i*4);
      img.push(256);
    }
    for (let i=0; i<64; i++) {
      real.push(256);
      img.push(256-i*4);
    }
    for (let i=0; i<64; i++) {
      real.push(256-i*4);
      img.push(0);
    }
    // for (let i = 0; i < mushuPoints3.length;) {
    //   real.push(mushuPoints3[i++]);
    //   img.push(mushuPoints3[i++]);
    // }

    transformRadix2(real, img);

    let coef = [];
    let n = 200;
    for (let i=0, j=0; i<6; i++)  {
      coef[j++] = Math.sqrt(real[i]* real[i] + img[i]*img[i])/n;
      coef[j++] = Math.atan2(img[i], real[i]);
    }
    // console.log(real)
    setCoeff(coef);
  }


  const pausePlay = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId (null)
    } else {
      setIntervalId(setInterval(() => update(time), 15));
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
    setFrame(frame);
    edge = [...edge, { x: frame.edge.x, y: frame.edge.y }];
    if (edge.length > 200) edge.shift();
    setEdge(edge)
  };


  return (<>
    <StarChartInit/>
    <StarChart data = {frame} edge = {edge}/>
    <Button handleClick = {pausePlay} text = {intervalId? "pause" : "play"}/>
    <Button handleClick = {updateCoeff} text = "mushu" />
  </>)
};

export default App
