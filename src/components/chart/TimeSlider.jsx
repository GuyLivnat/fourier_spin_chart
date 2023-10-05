import { useState } from "react";
import Slider from "../general_components/Slider";

const TimeSlider = ({units, renderSkipToFrame}) => {
    const step = 1/units

    const handleChange = (e) => {
        const time = parseFloat(e.target.value);
        renderSkipToFrame(time);
    }

    return ( 
        <input
            type="range"
            id={"time-slider"}
            min={0}
            max={1}
            step={step}
            onChange={handleChange}
            className="form-range"
        />
    )
}

export default TimeSlider;