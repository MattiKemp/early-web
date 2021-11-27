import { FaTimes, FaTrashAlt } from 'react-icons/fa'
//import StreamVid from './StreamVid'
import Image from './Image'
import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react'
//import Button from './Button';

// Component for an individual post
// Properties:
// post: post data (post object)
// onPostSelected: function to be called when the post is clicked
// saved: the ids of the posts the user has saved
// onSave: the function to call when the user saves the post
const Group = ({ group, messages, onGroupSelected }) => {

    return (
        <div className={`task`} onDoubleClick={() => onGroupSelected(messages)}>
            <h3>{group.name} <FaTimes style={{color: 'red', cursor: 'pointer'}} /></h3>
            {/* <p>{post.owner}</p> */}
            <Image source={'https://workoutdev.org:8001/media/images/' + group.picture} profileStyle={1}/>
            {/* <p>views: {post.views}</p> */}
            {/* {<Button text={`${saved.has(post.id) ? 'unsave' : 'save'}`} onClick={() => onSave(post.id)}></Button>} */}
        </div>
    )
}

export default Group
