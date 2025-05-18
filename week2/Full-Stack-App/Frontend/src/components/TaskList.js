import { useEffect, useState } from 'react';
import '../TaskList.css';
function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState("");
  const token = localStorage.getItem('token');

  
  useEffect(() => {
    const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };
    fetchTasks();
  }, [token]);

  const addTask = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: newTask })
      });
      const added = await res.json();
      setTasks([...tasks, added]);
      setNewTask("");
    } catch {
      setError("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch {
      setError("Error deleting task");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}/toggle`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      const updated = await res.json();
      setTasks(tasks.map(task => task.id === id ? updated : task));
    } catch {
      setError("Error updating task");
    }
  };

  return (
  <div className="task-container">
    <h2>Task Manager</h2>
    {loading && <p className="loading">Loading...</p>}
    {error && <p className="error">{error}</p>}
    <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New task" />
    <button onClick={addTask}>Add</button>
    <ul>
      {tasks.map(task => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          {task.text}
          <div>
            <button onClick={() => toggleTask(task.id)}>Complete</button>{' '}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default TaskPage;