import {useRef} from 'react'

const panSVG = (id, panX, panY, zoom, moveFunc) => {
    const start = useRef({x:0, y:0, viewX:0, viewY: 0});
    const element = document.getElementById(id);
    
    const handlePan = (e) => {
        e.preventDefault();
        
        const widthScale = zoom.current/element.clientWidth; 
        const heightScale = zoom.current/element.clientHeight * 0.5625; // 0.5625 is for 16:9 aspect ratio
        panX.current = (start.current.viewX + ((start.current.x - e.offsetX) * widthScale));
        panY.current = (start.current.viewY + ((start.current.y - e.offsetY) * heightScale));
        
        moveFunc();
    }

    if (element) {
        element.onmousedown = (e) => {
            e.preventDefault();
            start.current.x = e.offsetX;
            start.current.viewX = panX.current;
            start.current.y = e.offsetY;
            start.current.viewY = panY.current;
            element.style.cursor = "grabbing";
            element.addEventListener('mousemove', handlePan)
        }
        element.onmouseup = (e) => {
            e.preventDefault();
            element.style.cursor = "grab";
            element.removeEventListener('mousemove', handlePan)
        }
        element.onmouseleave = (e) => {
            e.preventDefault();
            element.style.cursor = "grab";
            element.removeEventListener('mousemove', handlePan)
        }
    }   
}

export default panSVG;