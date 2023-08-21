import StarChart from './starchart/StarChart'
import './App.css'
import Button from './Button';
import timestep from './starchart/timestep';
import { mockCoeff } from './../public/mockups/coeff';
import { useState } from 'react';
import transformRadix2 from './starchart/fft';
import StarChartInit from './starchart/StarChartInit';
import PointGenerator from './starchart/PointGenerator';
import UploadParseSVG from './UploadParseSVG';



function App() {
  let [coeff, setCoeff] = useState(mockCoeff);
  let [frame, setFrame] = useState(timestep(coeff, 0));
  let [edge, setEdge] = useState([]);
  let [intervalId, setIntervalId] = useState(null);
  let [time, setTime] = useState(0);
  let [points, setPoints] = useState(null);
  let [image, setImage] = useState(null);

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

  const generatePoints = () => {
    const segment = image.getTotalLength()/256;
    const tempPoints = [];
    for (let i = 0; i < 256; i++) {
      let point = image.getPointAtLength(i*segment);
      tempPoints.push(point.x);
      tempPoints.push(point.y);
    }
    setPoints(tempPoints);
    console.log("points generated")
  }

  const updateCoeff = () => {
    if (!points) {
      console.log("generate points first")
      return
    }
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId (null);  //pause!
      }
    setEdge([]); //empty edge points

    let real = [];
    let img = [];
    for (let i = 0; i < points.length;) {
      real.push(points[i++]);
      img.push(points[i++]);
    }

    transformRadix2(real, img);

    let coef = [];
    let n = 200;
    for (let i=0, j=0; i<256; i++)  {
      coef[j++] = Math.sqrt(real[i]* real[i] + img[i]*img[i])/n;
      coef[j++] = Math.atan2(img[i], real[i]);
    }

    setCoeff(coef);
    console.log("points transformed via fft")
  }


  const pausePlay = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId (null)
    } else {
      setIntervalId(setInterval(() => update(time), 45));
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
    <Button handleClick={pausePlay} text = {intervalId? "pause" : "play"}/>
    <Button handleClick={updateCoeff} text = "update" />
    <Button handleClick={generatePoints} text = "generate" />
    <UploadParseSVG handleFile={handleFile}/>
    <PointGenerator />
  </>)
};

export default App
