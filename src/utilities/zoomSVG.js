
const zoomSVG = (element, zoom, setZoom) => {
    const zoomSpeed = 50
    if (element && (zoom > zoomSpeed)) {
        element.onwheel = (e) => {
            e.preventDefault();
            const newZoom = zoom + (Math.sign(e.deltaY) * zoomSpeed)
            setZoom(newZoom)
        }
    }



}

export default zoomSVG;