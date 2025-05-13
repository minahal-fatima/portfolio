import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import About from './components/About';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
