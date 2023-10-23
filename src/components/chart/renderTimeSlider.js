import * as d3 from "d3";

const renderTimeSlider = (time) => {
    const percentTime = time * 100
    d3.select('#time-slider-fillbar')
        .style('background', `linear-gradient(90deg, rgb(172, 106, 106) ${percentTime}%, rgba(172, 106, 106, 0.5) ${percentTime}%)`);
 }

export default renderTimeSlider;

// background: linear-gradient(90deg, rgb(172, 106, 106) 50%, rgba(172, 106, 106, 0.5) 50%);