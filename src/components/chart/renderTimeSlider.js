import * as d3 from "d3";

const renderTimeSlider = (time) => {
    d3.select('#time-slider-fillbar').style('right', `${(1-time) * 100}%`);
 }

export default renderTimeSlider;
