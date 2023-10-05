import './TimeSlider.css'

const TimeSlider = ({units, renderSkipToFrame}) => {
    const step = 1/(units*2)

    const handleChange = (e) => {
        const time = parseFloat(e.target.value);
        renderSkipToFrame(time);
    }

    return ( 
        <div id = 'time-slider-wrapper'>
            <div id='time-slider-fillbar'></div>
            <input
                type='range'
                id='time-slider-input'
                min={0}
                max={1}
                step={step}
                onChange={handleChange}
                // className="form-range"
                // style={}
            />
        </div>
    )
}

export default TimeSlider;