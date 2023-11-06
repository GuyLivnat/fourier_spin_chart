import * as d3 from "d3";

const renderTimeSlider = (time) => {
  const percentTime = time * 100;
  d3.select("#time-slider-fillbar").style(
    "background",
    `linear-gradient(90deg, 
            rgba(191, 194, 240, 0.5) ${percentTime - 100}%, 
            rgb(191, 194, 240) ${percentTime}%, 
            rgba(191, 194, 240, 0.5) ${percentTime}%,
            rgb(191, 194, 240) ${percentTime + 100}%)`
  );
};

export default renderTimeSlider;
