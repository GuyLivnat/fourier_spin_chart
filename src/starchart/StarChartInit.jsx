
const StarChartInit = ({zoom, circlesActive, radiiActive, outlineActive}) => {
    const starSize = 3;
    const translateCenter = "translate("+zoom/2+","+zoom/2+")"
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
            >
        </g>

        <g
            id="radii"
            stroke="rgb(191, 194, 240)"
            transform={translateCenter}
            display={radiiActive}
            vectorEffect={"non-scaling-stroke"}
            style={{ strokeWidth: "1"}}
            >
        </g>

        <path
            vectorEffect={"non-scaling-stroke"}
            id="edgeFirst"
            stroke="rgb(172, 106, 106)"
            style={{fill: "none", strokeWidth: "2.6"}}
            markerEnd="url(#star)"
            transform={translateCenter}
            display={outlineActive}
        >
        </path>   

        <path
            vectorEffect={"non-scaling-stroke"}
            id="edgeSecond"
            stroke="rgb(172, 106, 106)"
            style={{fill: "none", strokeWidth: "2.3"}}
            transform={translateCenter}
            display={outlineActive}
        >
        </path> 

        <path
            vectorEffect={"non-scaling-stroke"}
            id="edgeThird"
            stroke="rgb(172, 106, 106)"
            style={{fill: "none", strokeWidth: "2"}}
            transform={translateCenter}
            display={outlineActive}
        >
        </path> 

        <path
            vectorEffect={"non-scaling-stroke"}
            id="edgeFourth"
            stroke="rgb(172, 106, 106)"
            style={{fill: "none", strokeWidth: "1.7"}}
            transform={translateCenter}
            display={outlineActive}
        >
        </path>   

        <path
            vectorEffect={"non-scaling-stroke"}
            id="edgeFifth"
            stroke="rgb(172, 106, 106)"
            style={{fill: "none", strokeWidth: "1.4"}}
            transform={translateCenter}
            display={outlineActive}
        >
        </path>         
    </svg>)
}

export default StarChartInit;