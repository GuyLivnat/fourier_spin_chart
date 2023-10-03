import {useState} from 'react'

const CollapseTitle = ({title, forBody}) => {
    const [collapse, setCollapse] = useState(false)

    return (
        <div>
            <h2
                data-bs-toggle='collapse'
                data-bs-target={`#${forBody}`}
                aria-expanded='false'
                aria-controls={`$${forBody}`}
                onClick={() => setCollapse(!collapse)}
                style={{cursor:"pointer"}}    
            >
                {title}
                <button
                    className='btn btn-sm'
                    style={{color:"grey"}}
                    type='button'>
                    {collapse? "\u25bc" : "\u25c0"}
                </button>
            </h2>
        </div>
    )
}

export default CollapseTitle;