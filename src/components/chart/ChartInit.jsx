
const ChartInit = ({circlesActive, radiiActive, outlineActive, lineSegments, coeffLength}) => {
    const circleSize = 1.5;

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
            markerStart={(i===0) || (i===1)? "url(#circle-marker)": null}
            key={i}
            id={"edge_" + i}
            opacity={strength}>
        </path> )
    }

    return (<svg
        id="chart"
        viewBox={"0, 230, 1000, 562.5"} //0.5625 is for 16:9 aspect ratio 
        style={{backgroundColor : 'black'}}
        >

        <defs>
            <marker
                id="circle-marker" 
                orient={"auto"} 
                markerHeight={circleSize*2} 
                markerWidth={circleSize*2} 
                refX={circleSize} 
                refY={circleSize}
            >
                <circle r={circleSize} cx={circleSize} cy={circleSize} fill="white"></circle>
            </marker>
        </defs>
        <g id="chart-shapes" transform="translate(500, 500)">
            <g
                id="circles"
                stroke="white"
                display={circlesActive? "true" : "none"}
                style={{fill: "none"}}
                opacity="40%"
            >
                {circles}
            </g>
            <path
                id="radii"
                stroke="rgb(191, 194, 240)"
                display={radiiActive? "true" : "none"}
                markerStart={"url(#circle-marker)"}
                style={{ fill:"none"}}
                opacity="50%"
                >
            </path>
            <g
                id="edge"
                style={{fill: "none"}}
                stroke="rgb(172, 106, 106)"
                display={outlineActive? "true" : "none"}
            >
            {edgeSegments} 
            </g>
        </g>
    </svg>)
}

export default ChartInit;