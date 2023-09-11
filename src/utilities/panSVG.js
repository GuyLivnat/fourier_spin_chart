import {useRef} from 'react'

const panSVG = (element, panX, panY, setPanX, setPanY, zoom) => {
    const isMoving = useRef(false);
    const start = useRef({x:0, y:0, viewX:panX, viewY: panY});

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
        const widthMod = zoom/element.clientWidth;
        const heightMod = zoom/element.clientHeight;
        if (!isMoving.current) return;
        setPanX(start.current.viewX - ((e.offsetX - start.current.x) * widthMod));
        setPanY(start.current.viewY - ((e.offsetY - start.current.y) * heightMod));
    }
}
}

export default panSVG;