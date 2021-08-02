import { FaTimes, FaTrashAlt } from 'react-icons/fa'
import StreamVid from './StreamVid'
import Image from './Image'
import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react'
import Button from './Button';



const Task = ({ task, onDelete, onToggle, onPostSelected, saved, onSave }) => {

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onPostSelected(task)}>
            <h3>{task.title} <FaTimes style={{color: 'red', cursor: 'pointer'}} /></h3>
            <p>{task.owner}</p>
            <Image source={'https://10.0.0.5:8001/media/images/' + task.thumbnail}/>
            <p>views: {task.views}</p>
            {<Button text={`${saved.has(task.id) ? 'unsave' : 'save'}`} onClick={() => onSave(task.id)}></Button>}
        </div>
    )
}

export default Task
