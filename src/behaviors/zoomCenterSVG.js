
const zoomCenterSVG = (element, panY, setPanY, zoom, setZoom, setTick, inOut) => {

    if (zoom > 50 && inOut) {

        const scale = 1/ (1.2);
        const height = element.clientHeight;
        const heightScale = zoom / height 
        const centeredY = ((height/2 * 0.5625) - height/2);  // 0.5625 is for 16:9 aspect ratio
        const y = panY - ((centeredY * scale) - centeredY) * heightScale;

        setPanY(y);
        setZoom(zoom*scale);
        setTick(Math.random());

    } else if(!inOut){
        const scale = 1.2;
        const height = element.clientHeight;
        const heightScale = zoom / height 
        const centeredY = ((height/2 * 0.5625) - height/2);  // 0.5625 is for 16:9 aspect ratio
        const y = panY - ((centeredY * scale) - centeredY) * heightScale;

        setPanY(y);
        setZoom(zoom*scale);
        setTick(Math.random());
    }
}

export default zoomCenterSVG;