import {useRef} from 'react'

const panSVG = (id, panX, panY, zoom, moveFunc) => {
    const isMoving = useRef(false);
    const start = useRef({x:0, y:0, viewX:0, viewY: 0});
    const element = document.getElementById(id);    

if (element) {
    element.onmousedown = (e) => {
        e.preventDefault();
        isMoving.current = true;
        start.current.x = e.offsetX;
        start.current.viewX = panX.current;
        start.current.y = e.offsetY;
        start.current.viewY = panY.current;
        element.style.cursor = "grabbing";
    }
    element.onmouseup = (e) => {
        e.preventDefault();
        isMoving.current = false;
        element.style.cursor = "grab";
    }
    element.onmouseleave = (e) => {
        e.preventDefault();
        isMoving.current = false;
        element.style.cursor = "grab";
    }
    element.onmousemove = (e) => {
        if (isMoving.current) {
            e.preventDefault();
            const widthScale = zoom.current/element.clientWidth; 
            const heightScale = zoom.current/element.clientHeight * 0.5625; // 0.5625 is for 16:9 aspect ratio
            
            panX.current = (start.current.viewX + ((start.current.x - e.offsetX) * widthScale));
            panY.current = (start.current.viewY + ((start.current.y - e.offsetY) * heightScale));
            
            moveFunc();
        }
    }
}
}

export default panSVG;