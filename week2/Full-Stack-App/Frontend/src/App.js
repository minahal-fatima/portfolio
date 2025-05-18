import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import LoginPage from './components/LoginPage';
import About from './components/About';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={token ? <TaskList /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
