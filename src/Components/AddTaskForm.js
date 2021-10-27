import { useState } from 'react';

const AddTaskForm = ({onAddTask}) => {
    const [taskName, setTaskName] = useState('');
    const [date, setDate] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSave = (e) => 
    {
        e.preventDefault();

        if (!taskName)
        {
            alert('Please fill in the Task Name');
            return;
        }

        if (!date)
        {
            alert('Please fill in the Date of the Task')
            return;
        }

        onAddTask({taskName, date, reminder});

        setTaskName('');
        setDate('');
        setReminder(false);
    }

    return (
        <form className = 'add-form'>
            <div className = 'form-control'>
                <label>Task</label>
                <input type = 'text' placeholder = 'Add Task' value = { taskName }
                onChange = {(e) => {setTaskName(e.target.value)}}/>
            </div>
            <div className = 'form-control'>
                <label>Date and Time</label>
                <input type = 'text' placeholder = 'Add Date & Time' value = { date }
                onChange = {(e) => {setDate(e.target.value)}}/>
            </div>
            <div className = 'form-control form-control-check'>
                <label>Set Reminder?</label>
                <input type = 'checkbox' value = { reminder } checked = {reminder}
                onChange = {(e) => {setReminder(e.target.checked)}}/>
            </div>

            <input className = 'btn btn-block' type = 'submit' value = 'Save Task' onClick = { onSave }/>
        </form>
    )
}

export default AddTaskForm
