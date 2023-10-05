import * as d3 from "d3";

const renderTimeSlider = (time) => {
    d3.select('#time-slider').property('value', time)
}

export default renderTimeSlider;
