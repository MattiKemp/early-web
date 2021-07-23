import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAddTask }) => {

    return (
        <header className='header'>
            <h1 style={{color: 'red'}}>{title}</h1>
            <Button color='green' text={!showAddTask ? 'Add' : 'Close'} onClick={onAdd}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.protoTypes = {
    title: PropTypes.string.isRequired,
}

// const headingStyle = {
//     color: 'red'
// }

export default Header
