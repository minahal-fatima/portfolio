import { useState, useEffect } from "react";
import '../TaskList.css';
function TaskList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completed, setCompleted] = useState({});

    useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
      })
      .then((data) => {
        const titles = data.map((item) => item.title);
        setTasks(titles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addTask = () => {
    if (newTask === '') return;
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setCompleted({ ...completed, [index]: !completed[index] });
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;
  return(
    <div className="task-container">
      <h2>Task Manager</h2>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={completed[index] ? 'completed' : ''}>
            {task}
            <div>
              <button onClick={() => toggleComplete(index)}>
                {completed[index] ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => removeTask(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTask}>Add</button>
      </div>
    </div>
  );
}
export default TaskList;