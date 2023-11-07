import * as d3 from "d3";

const renderTimeSlider = (time) => {
  const percentTime = time * 100;
  d3.select("#time-slider-fillbar").style(
    "background",
    `linear-gradient(90deg, 
            var(--half-primary) ${percentTime - 100}%, 
            var(--primary) ${percentTime}%, 
            var(--half-primary) ${percentTime}%,
            var(--primary) ${percentTime + 100}%)`
  );
};

export default renderTimeSlider;
