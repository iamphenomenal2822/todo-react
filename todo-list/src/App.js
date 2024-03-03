import logo from './logo.svg';
import React,{useState,useEffect} from 'react';
import {FaCheck, FaTrash} from 'react-icons/fa';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

useEffect(() => {
  const storedTasks = localStorage.getItem('tasks');
  if(storedTasks){
    setTasks(JSON.parse(storedTasks));
  }
},[]);

useEffect(() => {
  localStorage.setItem('tasks',JSON.stringify(tasks));
},[tasks]);

const addTask = () => {
  if(taskInput.trim() !== ''){
    setTasks([
      ...tasks,
      {id:Date.now(),
      text:taskInput,
    completed:false,
  priority:'low',}
    ]);
    setTaskInput('');
  }
};

const toggleTask = (taskId) => {
  setTasks( tasks.map((task)=> task.id === taskId ? {...task, completed: !task.completed} : task )
);
};

const deleteTask = (taskId) => {
  setTasks(tasks.filter((task) => task.id !== taskId));
};


return (
  <div className="app">
    <h1>Todo List</h1>
    <div className="add-task">
      <input
        type="text"
        placeholder="Add a task..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>
     <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(task.id)}>
              {task.text} - Priority: {task.priority}
              {task.completed && <FaCheck className="check-icon" />}
            </span>
            <button onClick={() => deleteTask(task.id)}>
              <FaTrash className="trash-icon" />
            </button>
          </li>
        ))}
      </ul>
  </div>
);
};

export default App;
