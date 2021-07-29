import { FaTimes, FaTrashAlt } from 'react-icons/fa'
import StreamVid from './StreamVid'
import Image from './Image'
import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react'



const Task = ({ task, onDelete, onToggle, onPostSelected}) => {
    // const [selected, setSelected] = useState(false)

    // const clicked = () => {
    //     setSelected(!selected);
    // }

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onPostSelected(task)}>
            {/* {!selected && <div> */}
            {/* <h3>{task.title} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}/></h3> */}
            <h3>{task.title} <FaTimes style={{color: 'red', cursor: 'pointer'}} /></h3>
            <p>{task.owner}</p>
            <Image source={'https://10.0.0.5:8001/media/images/' + task.thumbnail}/>
            {/* <img scr="https://post.medicalnewstoday.com/wp-content/uploads/2020/02/man-exercising-plank-push-up-1200x628-facebook.jpg"></img> */}
            {/* <StreamVid url={task.data}></StreamVid> */}
            <p>views: {task.views}</p>
            {/* {React.createElement("div", {className: "contexCon"}, elements)} */}
            {/* </div>} */}
        </div>
    )
}

export default Task
