import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const DuelSlider = ({
  id,
  max,
  leftThumbX,
  rightThumbX,
  setLeftThumbX,
  setRightThumbX,
}) => {
  const leftThumb = useRef(null);
  const rightThumb = useRef(null);
  const svg = useRef(null);
  const width = useRef(null);

  useLayoutEffect(() => {
    width.current = svg.current.clientWidth;
  });
  const height = max / 10;

  const startThumb = (thumb, moveFunc) => {
    thumb.current.addEventListener("mousemove", moveFunc);
  };

  const endThumb = (thumb, moveFunc) => {
    thumb.current.removeEventListener("mousemove", moveFunc);
  };

  const moveLeftThumb = (e) => {
    const newX = (e.offsetX / width.current) * max;
    if (newX < rightThumb.current.getAttribute("cx")) {
      setLeftThumbX(newX);
    }
  };

  const moveRightThumb = (e) => {
    const newX = (e.offsetX / width.current) * max;
    if (newX > leftThumb.current.getAttribute("cx")) {
      setRightThumbX(newX);
    }
  };

  const moveBar = () => {};

  return (
    <div id={id + "-duel-slider"}>
      <svg
        className="duel-slider-svg"
        // stroke="blue"
        viewBox={`0 0 ${max} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        ref={svg}
      >
        <rect
          x={leftThumbX}
          y={height / 4}
          height={height / 2}
          width={rightThumbX - leftThumbX}
          fill="green"
          onMouseDown={moveBar}
        ></rect>
        <circle
          r={height / 2}
          cx={leftThumbX}
          cy={height / 2}
          fill="yellow"
          onMouseDown={() => startThumb(leftThumb, moveLeftThumb)}
          onMouseUp={() => endThumb(leftThumb, moveLeftThumb)}
          onMouseOut={() => endThumb(leftThumb, moveLeftThumb)}
          ref={leftThumb}
        ></circle>
        <circle
          r={height / 2}
          cx={rightThumbX}
          cy={height / 2}
          fill="pink"
          onMouseDown={() => startThumb(rightThumb, moveRightThumb)}
          onMouseUp={() => endThumb(rightThumb, moveRightThumb)}
          onMouseOut={() => endThumb(rightThumb, moveRightThumb)}
          ref={rightThumb}
        ></circle>
      </svg>
    </div>
  );
};

export default DuelSlider;
