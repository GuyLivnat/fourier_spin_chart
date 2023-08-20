
const StarChartInit = () => {
    const width = 400;
    const height = 400;
    const starSize = 3;
    return (<svg
            id="chart"
            width={width}
            height={height}
            viewBox="-200 -200 400 400"
            style={{backgroundColor : 'black'}}>

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
            stroke="white">
            </g>

            <path
            id="edge"
            stroke="white"
            style={{fill: "none", strokeWidth: "2"}}
            markerEnd="url(#star)"
            >
            </path>
    </svg>)
}

export default StarChartInit;