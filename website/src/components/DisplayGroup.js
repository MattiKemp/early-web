import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import ReactDOM from 'react-dom';
//import StreamVid from './StreamVid'
import Image from './Image'
//import Profile from './Profile'
import Messages from './Messages'


// Component for displaying the content within a post
// Properties:
// content: content to be displayed (post)
// back: function to be called when the back button is selected
// select: whether any post is currently selected (boolean)
const DisplayGroup = ({ messages, back, select }) => {
    // the DOM/React elements of the content
    //const [elements, setElements] = useState([])
    // whether the content is loaded (not really used atm)
    //const [isLoaded, setIsLoaded] = useState(false)
    // previous content data (not really used atm)
    //const [prevData, setPrevData] = useState({})
    // function to load the selected content properly
    // idk if this is the best way to do this :/

    return (
        <div>
            {select && <div className="post-content">
                <Button color='green' text={"Back"} onClick={() => back(false)}/>
                <Button color='green' text={"Group"} onClick={() => {}}/>
                {/* <Profile profile={content.profile}/> */}
                <Messages messages={messages} />
                <form className='add-form'>
                    <div className='form-control'>
                        <label>Content</label>
                        <input type='text' placeholder='Send message' onChange={() => {}}/>
                    </div>
                    <input className='btn btn-block' type='submit' value='Create' />
                </form>
            </div>}
        </div>
    )
}


export default DisplayGroup
