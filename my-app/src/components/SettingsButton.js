import PropTypes from 'prop-types'

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
