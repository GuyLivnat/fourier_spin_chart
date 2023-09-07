
const StarChartInit = ({zoom, circlesActive, radiiActive, outlineActive, lineSegments, units}) => {
    const starSize = 3;
    const translateCenter = "translate("+zoom/2+","+zoom/2+")"

    const edgeSegments = []
    for (let i=0; i<lineSegments; i++) {
        let width = (2*(lineSegments-i)/lineSegments)
        edgeSegments.push(<path
            key={i}
            vectorEffect={"non-scaling-stroke"}
            id={"edge_" + i}
            stroke="rgb(172, 106, 106)"
            style={{fill: "none", strokeWidth: "1"}}
            transform={translateCenter}
            display={outlineActive}
            opacity={width}>
        </path> )
    }

    return (<svg
        id="chart"
        width="100%"
        viewBox={"0 0 " + zoom +" "+ zoom}  //zooms the original image
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
            vectorEffect={"non-scaling-stroke"}
            display={circlesActive}
            style={{strokeWidth: "0.5"}}
            >
        </g>

        <g
            id="radii"
            stroke="rgb(191, 194, 240)"
            transform={translateCenter}
            display={radiiActive}
            vectorEffect={"non-scaling-stroke"}
            style={{ fill:"none", strokeWidth: ".5", opacity:"50%"}}
            >
        </g>

        {edgeSegments}        
    </svg>)
}

export default StarChartInit;