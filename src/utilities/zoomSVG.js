
const zoomSVG = (element, zoom, setZoom) => {
    const zoomSpeed = 50
    if (element && (zoom > zoomSpeed)) {
        element.onwheel = (e) => {
            e.preventDefault();
            // console.log(e.clientX);
            // console.log(e.wheelDelta)
            // console.log(zoom)
            const newZoom = zoom + (Math.sign(e.deltaY) * zoomSpeed)
            setZoom(newZoom)
        }
    }



}

export default zoomSVG;