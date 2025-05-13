import { useState } from 'react';
import './App.css';

function TaskList() {
  const [task, setTask] = useState(["Walk dog", "Write Code", "Read Docs"]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask === '') return;
    setTask([...task, newTask]);
    setNewTask('');
  };

  const removeTask = (index) => {
    setTask(task.filter((_, i) => i !== index));
  };

  return (
    <div className="task-container">
      <h2>Task Manager</h2>
      <ul className="task-list">
        {task.map((tasks, index) => (
          <li key={index}>
            {tasks}
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='New Task'
        />
        <button onClick={addTask}>Add</button>
      </div>
    </div>
  );
}

export default TaskList;
