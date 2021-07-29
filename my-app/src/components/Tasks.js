import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, onPostSelected}) => {

    return (
        <div>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onPostSelected={onPostSelected}/>
            ))}

        </div>
    )
}

export default Tasks
