const zoomToSVG = (id, panX, panY, zoom, toX, toY, toZoom, moveFunc) => {
  const element = document.getElementById(id);

  panX.current = toX;
  panY.current = toY;
  zoom.current = toZoom;

  moveFunc();
};

export default zoomToSVG;
