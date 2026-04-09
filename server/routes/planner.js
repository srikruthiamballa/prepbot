const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all planner schedules
router.get('/', (req, res) => {
  db.all('SELECT * FROM planner', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// Add a new planner block
router.post('/', (req, res) => {
  const { subject, topic, duration_hours, priority } = req.body;
  
  if (!subject || !topic || !priority) {
    return res.status(400).json({ error: 'Missing required planner fields' });
  }

  db.run(`INSERT INTO planner (subject, topic, duration_hours, priority) VALUES (?, ?, ?, ?)`, 
    [subject, topic, duration_hours || 1, priority], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ 
      id: this.lastID, 
      subject, topic, 
      duration_hours: duration_hours || 1, 
      priority 
    });
  });
});

// Clear plan
router.delete('/', (req, res) => {
  db.run('DELETE FROM planner', [], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ updated: this.changes });
  });
});

module.exports = router;
