import PropTypes from 'prop-types'

// Component for the taskbar buttons
// properties:
// color: color of button
// text: text to be displayed by button
// onClick: function to call when button is clicked
// id: the id of the button (int)
// contentLoad: 
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
