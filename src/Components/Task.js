import { FaTimes } from 'react-icons/fa'

const Task = ({task, onDelete, onToggleReminder}) => {
    return (
        <div className={'task' + (task.reminder ? ' reminder' : '')} onDoubleClick={() => {onToggleReminder(task.id)}}>
            <h3>
                {task.taskName} 
                <FaTimes className = 'delete-btn' 
                onClick={() => {onDelete(task.id)}}/>
            </h3>
            <p>{task.date}</p>
        </div>
    )
}

export default Task
