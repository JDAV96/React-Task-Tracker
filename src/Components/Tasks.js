import Task from './Task'

export const Tasks = ({tasks, onDelete, onToggleReminder}) => {
    return (
        <>
          {tasks.map((task) => (
          <Task 
          key={task.id} 
          task={task} 
          onDelete={onDelete}
          onToggleReminder={onToggleReminder}
          />))}  
        </>
    )
}

export default Tasks
