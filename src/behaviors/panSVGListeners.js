const panSVGListeners = (id, panX, panY, zoom, moveFunc) => {
  const element = document.getElementById(id);
  const start = { offsetX: 0, offsetY: 0, x: 0, y: 0 };

  const startPan = (e) => {
    start.offsetX = e.offsetX;
    start.x = panX.current;
    start.offsetY = e.offsetY;
    start.y = panY.current;
    element.style.cursor = "grabbing";
    element.addEventListener("mousemove", panSVG);
  };

  const endPan = (e) => {
    element.style.cursor = "grab";
    element.removeEventListener("mousemove", panSVG);
  };

  const panSVG = (e) => {
    const widthScale = zoom.current / element.clientWidth;
    const heightScale = (zoom.current / element.clientHeight) * 0.5625; // 0.5625 is for 16:9 aspect ratio
    panX.current = start.x + (start.offsetX - e.offsetX) * widthScale;
    panY.current = start.y + (start.offsetY - e.offsetY) * heightScale;
    moveFunc();
  };

  const listeners = [];
  listeners.push(
    { evnt: "mousedown", func: startPan },
    { evnt: "mouseup", func: endPan },
    { evnt: "mouseleave", func: endPan }
  );
  return listeners;
};

export default panSVGListeners;
