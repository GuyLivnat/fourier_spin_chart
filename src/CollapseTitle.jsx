
const CollapseTitle = ({title, forBody}) => {
    return (
        <div
            className ='col align-items-start justify-content-middle'>
            <h2>{title}</h2>
            <button
                className='btn btn-outline-primary btn-sm'
                data-bs-toggle='collapse'
                type='button'
                data-bs-target={`#${forBody}`}
                aria-expanded='false'
                aria-controls={`$${forBody}`}
                >{"\u25bc"}
            </button>
        </div>
    )
}

export default CollapseTitle;