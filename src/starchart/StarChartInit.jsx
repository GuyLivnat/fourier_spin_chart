
const StarChartInit = ({handleClick}) => {
    const width = 500;
    const height = 500;
    const starSize = 3;
    const translateCenter = "translate("+height/2+","+width/2+")"
    return (<svg
            id="chart"
            width={width}
            height={height}
            // viewBox="0 0 500 500"  //zooms the original image
            style={{backgroundColor : 'black'}}
            onClick={handleClick}>

            <defs>
                <marker
                id="star" 
                orient={"auto"} 
                markerHeight={starSize*2} 
                markerWidth={starSize*2} 
                refX={starSize} 
                refY={starSize}>
                    <circle r={starSize} cx={starSize} cy={starSize} fill="white"></circle>
                </marker>
            </defs>

            <g
            id="orbits"
            stroke="white"
            transform={translateCenter}>
            </g>

            <path
            id="edge"
            stroke="white"
            style={{fill: "none", strokeWidth: "2"}}
            markerEnd="url(#star)"
            transform={translateCenter}
            >
            </path>         
    </svg>)
}

export default StarChartInit;