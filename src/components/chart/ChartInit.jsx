import gradientSampler from "../../utilities/gradientSampler";
import rgbObjToString from "../../utilities/RGBObjToString";

const ChartInit = ({ lineSegments, coeffLength, chartColors }) => {
  const circleSize = 1.5;
  const { backgroundColor, edgeColor, radiiColor, circlesColor } = chartColors;

  const circles = [];
  for (let i = 0; i < coeffLength; i++) {
    circles.push(
      <circle key={i} id={"circle_" + i} cx={0} cy={0} r={0}></circle>
    );
  }

  const edgeSegments = [];
  for (let i = 0; i < lineSegments + 1; i++) {
    let strength = (lineSegments - i) / lineSegments + edgeColor.gamma;
    if (strength > 1) strength = 1;
    edgeSegments.unshift(
      <path
        markerStart={i === 0 ? "url(#circle-marker)" : null}
        key={i}
        id={"edge_" + i}
        stroke={gradientSampler(edgeColor, backgroundColor, strength)}
      ></path>
    );
  }

  return (
    <svg
      id="chart"
      viewBox={"0, 230, 1000, 562.5"} //0.5625 is for 16:9 aspect ratio
      style={{
        backgroundColor: rgbObjToString(backgroundColor),
      }}
    >
      <defs>
        <marker
          id="circle-marker"
          orient={"auto"}
          markerHeight={circleSize * 2}
          markerWidth={circleSize * 2}
          refX={circleSize}
          refY={circleSize}
        >
          <circle
            r={circleSize}
            cx={circleSize}
            cy={circleSize}
            fill="white"
          ></circle>
        </marker>
      </defs>
      <g id="chart-shapes" transform="translate(500, 500)">
        <g
          id="edge"
          style={{ fill: "none" }}
          display={edgeColor.hidden ? "none" : "true"}
        >
          {edgeSegments}
        </g>
        <g
          id="circles"
          stroke={rgbObjToString(circlesColor)}
          display={circlesColor.hidden ? "none" : "true"}
          style={{ fill: "none" }}
          opacity="40%"
        >
          {circles}
        </g>
        <path
          id="radii"
          stroke={rgbObjToString(radiiColor)}
          display={radiiColor.hidden ? "none" : "true"}
          markerStart={"url(#circle-marker)"}
          style={{ fill: "none" }}
          opacity="50%"
        ></path>
      </g>
    </svg>
  );
};

export default ChartInit;
