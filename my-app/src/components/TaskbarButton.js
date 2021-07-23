import PropTypes from 'prop-types'

const TaskbarButton = ({ color, text, onClick, id}) => {

    return (
        <div>
            <button
            onClick={() => onClick(id)} 
            style={{ backgroundColor: color }} 
            className='tbtn'>
                {text}
            </button>
        </div>
    )
}

// TaskbarButton.defaultProps = {
//     color : 'white'
// }

TaskbarButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
    id: PropTypes.number
}

export default TaskbarButton
