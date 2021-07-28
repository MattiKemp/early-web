import PropTypes from 'prop-types'

const TaskbarButton = ({ color, text, onClick, id, contentLoad}) => {

    const onEdit = () => {
        onClick(id);
        contentLoad(0);
    }

    return (
        <div>
            <button
            onClick={() => onEdit()}  
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
    id: PropTypes.number,
    contentLoad: PropTypes.func
}

export default TaskbarButton
