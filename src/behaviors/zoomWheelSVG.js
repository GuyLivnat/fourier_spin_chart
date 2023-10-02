import moveChartSVG from './moveChartSVG';

const zoomWheelSVG = (id, panX, panY, zoom) => {
    const element = document.getElementById(id)

    if (element && (zoom.current > 50)) {
        element.onwheel = (e) => {
            const delta = Math.sign(e.deltaY)  // different browsers use e.deltaY (mouse scroll) with different values, so here is it normalized to 1 or -1
            const scale = (delta < 0) ? 1 / 1.2 : 1 * 1.2;
            
            const width = element.clientWidth;
            const height = element.clientHeight;
            
            const widthScale = zoom.current / width
            const heightScale = zoom.current / height 

            const centeredX = (e.offsetX - width/2); // using the center of the SVG instead of the top left corner as 0,0
            const centeredY = (e.offsetY * 0.5625 - height/2);  // 0.5625 is for 16:9 aspect ratio

            panX.current = panX.current - ((centeredX * scale) - centeredX) * widthScale;
            panY.current = panY.current - ((centeredY * scale) - centeredY) * heightScale;
            zoom.current  = zoom.current * scale;

            moveChartSVG(panX, panY, zoom); // chart specific!
        }
    }



}

export default zoomWheelSVG;