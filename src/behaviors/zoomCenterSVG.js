
const zoomCenterSVG = (id, panY, zoom, moveFunc, inOut) => {
    const element = document.getElementById(id);
    let scale = 1
    if (zoom.current > 50 && inOut) {
        scale = 1/ (1.2);
    } else if (!inOut) {
        scale = 1.2;}
    const height = element.clientHeight;
    const heightScale = zoom.current / height 
    const centeredY = ((height/2 * 0.5625) - height/2);  // 0.5625 is for 16:9 aspect ratio
    panY.current = panY.current - ((centeredY * scale) - centeredY) * heightScale;
    zoom.current = zoom.current * scale;
    
    moveFunc();
}

export default zoomCenterSVG;