import Header from './Components/Header'
import Footer from './Components/Footer'
import Tasks from './Components/Tasks'
import About from './Components/About'
import AddTaskForm from './Components/AddTaskForm'
import { useState, useEffect } from "react"
import {BrowserRouter, Route} from 'react-router-dom'

function App() {
  const SERVER_ROOT_URL = 'http://localhost:5000/tasks';
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([])

  useEffect(() =>
  {
    const requestTasks = async () =>
    {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    }
    
    requestTasks();
  });

  const fetchTasks = async() =>
  {
    const res = await fetch(SERVER_ROOT_URL);
    const data = await res.json();
    
    return data;
  }

  const fetchTask = async(id) =>
  {
    const res = await fetch(SERVER_ROOT_URL + '/' + id);
    const data = await res.json();
    
    return data;
  }

  const deleteTask = async (id) => 
  {
    await fetch(SERVER_ROOT_URL + '/' + id, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const addTask = async (task) =>
  {
    const res = await fetch(SERVER_ROOT_URL, 
      { 
        method: 'POST',
        headers: 
        {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

    const addedData = await res.json();
    setTasks([...tasks, addedData]);
  }

  const toggleReminder = async (id) => 
  {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};
    const res = await fetch(SERVER_ROOT_URL + '/' + id,
    {
      method: 'PUT',
      headers: 
      {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    const updatedData = await res.json();

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !updatedData.reminder} : task))
  }

  const toggleTaskForm = () => 
  {
    setShowTaskForm(!showTaskForm);
  }

  return (
    <BrowserRouter>
      <div className="container">
      <Header toggleForm = {toggleTaskForm} showingForm = {showTaskForm}/>
      <Route path='/' exact render={() => { return (
        <>
          {showTaskForm && <AddTaskForm onAddTask = {addTask} />}
          {tasks.length > 0 ? 
          (<Tasks tasks={tasks} onDelete = {deleteTask} onToggleReminder = {toggleReminder}/>)
          : ('Task List Empty')}
        </>
      )}}/>
      <Route path='/about' component={About}/>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
