
const StarChartInit = ({zoom, orbitsActive, radiiActive, outlineActive}) => {
    const width = 500;
    const height = 500;
    const starSize = 3;
    const translateCenter = "translate("+zoom/2+","+zoom/2+")"
    return (<svg
        id="chart"
        width={width}
        height={height}
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
            id="orbits"
            stroke="white"
            transform={translateCenter}
            vectorEffect={"non-scaling-stroke"}
            display={orbitsActive}
            >
        </g>

        <g
            id="radii"
            stroke="blue"
            transform={translateCenter}
            display={radiiActive}
            >
        </g>

        <path
            vectorEffect={"non-scaling-stroke"}
            id="edge"
            stroke="white"
            style={{fill: "none", strokeWidth: "2"}}
            markerEnd="url(#star)"
            transform={translateCenter}
            display={outlineActive}
        >
        </path>         
    </svg>)
}

export default StarChartInit;