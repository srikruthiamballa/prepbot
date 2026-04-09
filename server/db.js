const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'prepbot.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Initialize Progress Table
    db.run(`CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      duration TEXT DEFAULT '1h',
      completed BOOLEAN NOT NULL DEFAULT 0
    )`);

    // Initialize Planner Table
    db.run(`CREATE TABLE IF NOT EXISTS planner (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       subject TEXT NOT NULL,
       topic TEXT NOT NULL,
       duration_hours REAL NOT NULL,
       priority TEXT NOT NULL
    )`);

    // Initialize Categories Table
    db.run(`CREATE TABLE IF NOT EXISTS categories (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL UNIQUE,
       color TEXT NOT NULL
    )`);
  }
});

module.exports = db;
