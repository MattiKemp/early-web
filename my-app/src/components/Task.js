import { FaTimes, FaTrashAlt } from 'react-icons/fa'
import StreamVid from './StreamVid'


const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.title} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}/></h3>
            <p>{task.owner}</p>
            <StreamVid url={task.data}></StreamVid>
            <p>views: {task.views}</p>
        </div>
    )
}

export default Task
