import StarChart from './starchart/StarChart'
import './App.css'
import Button from './Button';
import timestep from './starchart/timestep';
import { mockCoeff } from './../public/mockups/coeff';
import { useState } from 'react';
import StarChartInit from './starchart/StarChartInit';
import UploadButton from './UploadButton';
import createCoeff from './starchart/createCoeff';




function App() {
  const units = 256;
  const updateSpeed = 45;
  let [coeff, setCoeff] = useState(mockCoeff);
  let [frame, setFrame] = useState(timestep(coeff, 0));
  let [edge, setEdge] = useState([]);
  let [time, setTime] = useState(0);
  let [intervalId, setIntervalId] = useState(null);
  // let [points, setPoints] = useState(null);
  let [image, setImage] = useState(null);

  const handleCoeff = async() => {
    let coef = await createCoeff(image, units)
    setCoeff(coef)
  }

  const handleFile = (event) => {
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
          let string = e.target.result;
          const parser = new DOMParser();
          let parsedFile = parser.parseFromString(string, "image/svg+xml");
          let path = parsedFile.querySelector("path")
          console.log("file uploaded")
          setImage(path)
      }
      reader.readAsText(file)
    }

  // const generatePoints = () => {
  //   const segment = image.getTotalLength()/units;
  //   const tempPoints = [];
  //   for (let i = 0; i < units; i++) {
  //     let point = image.getPointAtLength(i*segment);
  //     tempPoints.push(point.x);
  //     tempPoints.push(point.y);
  //   }
  //   setPoints(tempPoints);
  //   console.log("points generated")
  // }

  // const updateCoeff = () => {
  //   if (!points) {
  //     console.log("generate points first")
  //     return
  //   }
  //   if (intervalId) {
  //     clearInterval(intervalId);
  //     setIntervalId (null);  //pause!
  //     }
  //   setEdge([]); //empty edge points

  //   let real = [];
  //   let img = [];
  //   for (let i = 0; i < points.length;) {
  //     real.push(points[i++]);
  //     img.push(points[i++]);
  //   }

  //   transformRadix2(real, img);

  //   let coef = [];
  //   let n = 200;
  //   for (let i=0, j=0; i<units; i++)  {
  //     coef[j++] = Math.sqrt(real[i]* real[i] + img[i]*img[i])/n;
  //     coef[j++] = Math.atan2(img[i], real[i]);
  //   }

  //   setCoeff(coef);
  //   console.log("points transformed via fft")
  // }


  const pausePlay = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId (null)
    } else {
      setIntervalId(setInterval(() => update(time), updateSpeed));
    }};

  const update = () => {
    const step = 1/(units*2);
    if (time === 1) {
      time = 0
    } else {
      time += step
    }
    frame = timestep(coeff, time);
    edge = [...edge, { x: frame.edge.x, y: frame.edge.y }];
    if (edge.length > units - (units/10)) edge.shift();
    setFrame(frame);
    setTime(time);
    setEdge(edge);
  };


  return (<>
    <StarChartInit/>
    <StarChart data = {frame} edge = {edge}/>
    <Button handleClick={pausePlay} text = {intervalId? "pause" : "play"}/>
    {/* <Button handleClick={updateCoeff} text = "update" /> */}
    <Button handleClick={handleCoeff} text = "generate" />
    <UploadButton handleFile={handleFile}/>
  </>)
};

export default App
