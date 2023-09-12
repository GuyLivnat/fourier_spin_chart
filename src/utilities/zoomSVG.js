
const zoomSVG = (element, panX, panY, setPanX, setPanY, zoom, setZoom) => {

    if (element && (zoom > 50)) {
        element.onwheel = (e) => {
            e.preventDefault();

            const delta = Math.sign(e.deltaY)  // different browsers use e.deltaY (mouse scroll) with different values, so here is it normalized to 1 or -1
            const scale = (delta < 0) ? 1 / 1.2 : 1 * 1.2;
            
            const width = element.clientWidth;
            const height = element.clientHeight;
            
            const widthScale = zoom / width
            const heightScale = zoom / height 

            const centeredX = (e.offsetX - width/2); // using the center of the SVG instead of the top left corner as 0,0
            const centeredY = (e.offsetY* 0.5625 - height/2);  // 0.5625 is for 16:9 aspect ratio

            const x = panX - ((centeredX * scale) - centeredX) * widthScale;
            const y = panY - ((centeredY * scale) - centeredY) * heightScale;

            setPanX(x)
            setPanY(y)
            setZoom(zoom*scale);
        }
    }



}

export default zoomSVG;