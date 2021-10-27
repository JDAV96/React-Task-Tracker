import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({title, toggleForm, showingForm}) => {
    const location = useLocation();

    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && 
            (<Button 
            color = {showingForm ? 'red' : 'green'}
            text = {showingForm ? 'Hide Form' : 'Add Entry'} 
            onClick = {toggleForm}/>)}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
