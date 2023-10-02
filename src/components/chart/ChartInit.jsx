
const ChartInit = ({circlesActive, radiiActive, outlineActive, lineSegments, coeffLength}) => {
    const starSize = 1.5;

    const chart = document.getElementById("chart");
    const minStroke = chart ? 1000/chart.clientWidth : 0.1;

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
        <g id="chart-shapes" transform="translate(500, 500)">
            <g
                id="circles"
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
                display={radiiActive? "true" : "none"}
                markerStart={"url(#star)"}
                style={{ fill:"none", strokeWidth: minStroke*2}}
                opacity="50%"
                >
            </path>
            <g
                id="edge"
                style={{fill: "none", strokeWidth: minStroke*2.5}}
                stroke="rgb(172, 106, 106)"
                display={outlineActive? "true" : "none"}
            >
            {edgeSegments} 
            </g>
        </g>
    </svg>)
}

export default ChartInit;