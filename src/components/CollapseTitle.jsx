import {useState} from 'react'

const CollapseTitle = ({title, forBody}) => {
    const [collapse, setCollapse] = useState(false)

    return (
        <div>
            <h2>
                {title}
                <button
                    className='btn btn-sm'
                    style={{color:"grey"}}
                    data-bs-toggle='collapse'
                    type='button'
                    data-bs-target={`#${forBody}`}
                    aria-expanded='false'
                    aria-controls={`$${forBody}`}
                    onClick={() => setCollapse(!collapse)}
                    >{collapse? "\u25bc" : "\u25c0"}
                </button>
            </h2>
        </div>
    )
}

export default CollapseTitle;