
const ChartInit = ({zoom, circlesActive, radiiActive, outlineActive, lineSegments, panX, panY, coeffLength}) => {
    const starSize = 1.5;
    const translateCenter = `translate(${zoom/2}, ${zoom/2})`;

    const chart = document.getElementById("chart");
    const minStroke = chart ? zoom/chart.clientWidth : 0.1;

    const circles = []
    for (let i=0; i < coeffLength; i++) {
        circles.push( <circle
            key={i}
            id={"circle_" + i}
            cx={0}
            cy={0}
            r={0}></circle>)
    }

    const edgeSegments = []
    for (let i=0; i<lineSegments; i++) {
        let strength = ((lineSegments-i)/lineSegments)
        edgeSegments.push(<path
            markerStart={(i===0) || (i===1)? "url(#star)": null}
            key={i}
            id={"edge_" + i}
            stroke="rgb(172, 106, 106)"
            style={{fill: "none", strokeWidth: minStroke*2.5}}
            transform={translateCenter}
            display={outlineActive? "true" : "none"}
            opacity={strength}>
        </path> )
    }

    return (<svg
        id="chart"
        viewBox={`${panX} ${panY} ${zoom} ${zoom* 0.5625}`} //0.5625 is for 16:9 aspect ratio 
        style={{backgroundColor : 'black'}}
        >

        <defs>
            <marker
            id="star" 
            orient={"auto"} 
            markerHeight={starSize*2} 
            markerWidth={starSize*2} 
            refX={starSize} 
            refY={starSize}
            >
                <circle r={starSize} cx={starSize} cy={starSize} fill="white"></circle>
            </marker>
        </defs>

        <g
            id="circles"
            transform={translateCenter}
            stroke="white"
            display={circlesActive? "true" : "none"}
            style={{fill: "none", strokeWidth: minStroke}}
            opacity="40%"
            >
                            {circles}
        </g>

        <path
            id="radii"
            stroke="rgb(191, 194, 240)"
            transform={translateCenter}
            display={radiiActive? "true" : "none"}
            markerStart={"url(#star)"}
            style={{ fill:"none", strokeWidth: minStroke*2}}
            opacity="50%"
            >
        </path>

        {edgeSegments} 
    </svg>)
}

export default ChartInit;