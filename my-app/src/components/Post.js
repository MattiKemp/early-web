import { FaTimes, FaTrashAlt } from 'react-icons/fa'
import StreamVid from './StreamVid'
import Image from './Image'
import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react'
import Button from './Button';

// Component for an individual post
// Properties:
// post: post data (post object)
// onPostSelected: function to be called when the post is clicked
// saved: the ids of the posts the user has saved
// onSave: the function to call when the user saves the post
const Post = ({ post, onDelete, onToggle, onPostSelected, saved, onSave }) => {

    return (
        <div className={`task ${post.reminder ? 'reminder' : ''}`} onDoubleClick={() => onPostSelected(post)}>
            <h3>{post.title} <FaTimes style={{color: 'red', cursor: 'pointer'}} /></h3>
            <p>{post.owner}</p>
            <Image source={'https://10.0.0.5:8001/media/images/' + post.thumbnail}/>
            <p>views: {post.views}</p>
            {<Button text={`${saved.has(post.id) ? 'unsave' : 'save'}`} onClick={() => onSave(post.id)}></Button>}
        </div>
    )
}

export default Post
