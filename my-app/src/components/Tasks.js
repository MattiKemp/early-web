import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, onPostSelected, saved, onSave}) => {

    return (
        <div>
            {tasks.map((task) => (
                <Task key={task.localId} task={task} onDelete={onDelete} onToggle={onToggle} onPostSelected={onPostSelected} saved={saved} onSave={onSave}/>
            ))}

        </div>
    )
}

export default Tasks
