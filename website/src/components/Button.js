import PropTypes from 'prop-types'

// General Button Component
// takes properties:
// color: color of button
// text: text to be displayed
// onClick: function to be called when the button is clicked
const Button = ({ color, text, onClick }) => {

    return (
        <div>
            <button
            onClick={onClick} 
            style={{ backgroundColor: color }} 
            className='btn'>
                {text}
            </button>
        </div>
    )
}

Button.defaultProps = {
    color : 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
