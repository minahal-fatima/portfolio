import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginPage.css';
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    navigate("/tasks");
  };

  return (
  <div className="login-container">
    <h2>Login</h2>
    <input
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Username"
    />
    <input
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      type="password"
    />
    <button onClick={login}>Login</button>
  </div>
);

}

export default LoginPage;