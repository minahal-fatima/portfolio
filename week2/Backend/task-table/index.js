const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Get all tasks
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Add a task
app.post('/api/tasks', authenticateToken, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Task text is required' });

  try {
    const result = await pool.query(
      'INSERT INTO tasks (text) VALUES ($1) RETURNING *',
      [text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Simple login to get a token
app.post('/login', (req, res) => {
  const user = { id: 1, username: 'admin' };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
