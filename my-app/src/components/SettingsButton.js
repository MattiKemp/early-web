import PropTypes from 'prop-types'

// Component for the buttons in the user profile tab
// Properties:
// color: what color the button will be
// text: what text will be displayed on the button (string)
// onClick: function to call when the button is clicked 
// id: id of the button (int)
const SettingsButton = ({ color, text, onClick, id}) => {
    return (
        <div>
            <button
            onClick={() => onClick(id)} 
            style={{ backgroundColor: color }} 
            className='sbtn'>
                {text}
            </button>
        </div>
    )
}

// TaskbarButton.defaultProps = {
//     color : 'white'
// }

SettingsButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
    id: PropTypes.number
}

export default SettingsButton
