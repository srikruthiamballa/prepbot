const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all progress items
router.get('/', (req, res) => {
  db.all('SELECT * FROM progress', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// Add a new progress item
router.post('/', (req, res) => {
  const { task, duration } = req.body;
  if (!task) return res.status(400).json({ error: 'Task is required' });

  const dur = duration ? String(duration) + 'h' : '1h';

  db.run('INSERT INTO progress (task, duration, completed) VALUES (?, ?, 0)', [task, dur], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, task, duration: dur, completed: 0 });
  });
});

// Toggle completion status
router.put('/:id', (req, res) => {
  const { completed } = req.body;
  const id = req.params.id;
  db.run('UPDATE progress SET completed = ? WHERE id = ?', [completed ? 1 : 0, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ updated: this.changes });
  });
});

module.exports = router;
