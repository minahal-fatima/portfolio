const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('./db');

const app = express();
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

app.post('/login', (req, res) => {
  const user = { id: 1, username: 'admin' };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/tasks', authenticateToken, async (req, res) => {
  console.log("🔍 /api/tasks called");
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    console.log(" Rows:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});


app.post('/api/tasks', authenticateToken, async (req, res) => {
  const { text } = req.body;
  const result = await pool.query('INSERT INTO tasks (text) VALUES ($1) RETURNING *', [text]);
  res.status(201).json(result.rows[0]);
});

app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
  res.json({ message: 'Task deleted' });
});

app.put('/api/tasks/:id/toggle', authenticateToken, async (req, res) => {
  const result = await pool.query(
    'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
    [req.params.id]
  );
  res.json(result.rows[0]);
});

app.listen(5000, () => console.log(' Backend running on http://localhost:5000'));
