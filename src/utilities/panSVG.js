import {useRef} from 'react'

const panSVG = (element, panX, panY, setPanX, setPanY, zoom) => {
    const isMoving = useRef(false);
    const start = useRef({x:0, y:0, viewX:0, viewY: 0});

if (element) {
    element.onmousedown = (e) => {
        e.preventDefault;
        isMoving.current = true;
        start.current.x = e.offsetX;
        start.current.viewX = panX;
        start.current.y = e.offsetY;
        start.current.viewY = panY;
    }
    element.onmouseup = (e) => {
        e.preventDefault;
        isMoving.current = false;
    }
    element.onmouseleave = (e) => {
        e.preventDefault;
        isMoving.current = false;
    }
    element.onmousemove = (e) => {
        if (isMoving.current) {
            const widthScale = zoom/element.clientWidth; 
            const heightScale = zoom/element.clientHeight * 0.5625; // 0.5625 is for 16:9 aspect ratio
            
            setPanX(start.current.viewX + ((start.current.x - e.offsetX) * widthScale));
            setPanY(start.current.viewY + ((start.current.y - e.offsetY) * heightScale)); 
        }
    }
}
}

export default panSVG;