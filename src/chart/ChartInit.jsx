
const ChartInit = ({zoom, circlesActive, radiiActive, outlineActive, lineSegments, panX, panY}) => {
    const starSize = 3;
    const translateCenter = `translate(${zoom/2}, ${zoom/2})`;

    const edgeSegments = []
    for (let i=0; i<lineSegments; i++) {
        let strength = ((lineSegments-i)/lineSegments)
        edgeSegments.push(<path
            markerStart={(i===0) || (i===1)? "url(#star)": null}
            key={i}
            // vectorEffect={"non-scaling-stroke"}
            id={"edge_" + i}
            stroke="rgb(172, 106, 106)"
            style={{fill: "none", strokeWidth: {strength}}}
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
            stroke="white"
            transform={translateCenter}
            // vectorEffect={"non-scaling-stroke"}
            display={circlesActive? "true" : "none"}
            style={{strokeWidth: "0.5"}}
            >
        </g>

        <g
            id="radii"
            stroke="rgb(191, 194, 240)"
            transform={translateCenter}
            display={radiiActive? "true" : "none"}
            // vectorEffect={"non-scaling-stroke"}
            style={{ fill:"none", strokeWidth: ".5", opacity:"50%"}}
            >
        </g>

        {edgeSegments} 
    </svg>)
}

export default ChartInit;