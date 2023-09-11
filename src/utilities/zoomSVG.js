
const zoomSVG = (element, panX, panY, setPanX, setPanY, zoom, setZoom) => {

    if (element && (zoom > 50)) {
        element.onwheel = (e) => {
            e.preventDefault();
            const delta = Math.sign(e.deltaY)
            let newZoom = 0
            if (delta < 0) newZoom = zoom / 1.2;
            else newZoom = zoom * 1.2
            
            const width = element.clientWidth;
            const scale = zoom/width
            const normalX = e.offsetX; 
            console.log(panX)
            // console.log(normalX/zoom*newZoom*scale)
            const x = (e.offsetX - (normalX)/zoom*newZoom)*scale;
            const height = element.clientHeight / 2;
            const normalY = e.offsetY * scale - height/2; 
            const y = normalY - (normalY - panY)/zoom*newZoom;
            setPanX(x)
            // setPanY(y)
            setZoom(newZoom);
        }
    }



}

export default zoomSVG;