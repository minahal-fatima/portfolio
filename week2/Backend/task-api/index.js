const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

let tasks = [];
let currentId = 1;

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // split "Bearer TOKEN"
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

app.get('/api/tasks', authenticateToken, (req, res) => {
    res.json(tasks);
})

app.post('/login', (req, res) => {
    const user = {id:1, username: 'admin'};
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
})

app.post('/api/tasks', authenticateToken, (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Task text is required' });

  const task = { id: currentId++, text };
  tasks.push(task);
  res.status(201).json(task);
});

app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.json({message: 'Task deleted'});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong'});
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
