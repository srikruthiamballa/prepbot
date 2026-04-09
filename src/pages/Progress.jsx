import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiCircle, FiPlus } from 'react-icons/fi';
import './Pages.css';

const Progress = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch tasks
  useEffect(() => {
    axios.get('http://localhost:5001/api/progress')
      .then(res => {
        setTasks(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask) return;
    axios.post('http://localhost:5001/api/progress', { task: newTask })
      .then(res => {
        setTasks([...tasks, res.data]);
        setNewTask('');
      })
      .catch(err => console.error(err));
  };

  const toggleTask = (id, currentStatus) => {
    axios.put(`http://localhost:5001/api/progress/${id}`, { completed: !currentStatus })
      .then(() => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="page-container animate-fade-in-up">
      <div className="page-header">
        <h1 className="text-gradient">Progress Tracking</h1>
        <p>Keep track of your study milestones with persistent checklists.</p>
      </div>

      <div className="card-container">
        <form onSubmit={addTask} className="add-form">
          <input 
            type="text" 
            placeholder="What should we study next...?" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            className="input-field"
          />
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center' }}>
            <FiPlus size={20} />
          </button>
        </form>

        <div className="checklist">
          {loading && <p>Loading checklist...</p>}
          {!loading && tasks.length === 0 && <p className="empty-state">No active tasks. Time to add some!</p>}
          {tasks.map(t => (
            <div 
              key={t.id} 
              className={`task-row ${t.completed ? 'completed' : ''}`}
              onClick={() => toggleTask(t.id, t.completed)}
            >
              <div className="task-icon">
                {t.completed ? <FiCheckCircle size={24} color="var(--primary-color)" /> : <FiCircle size={24} />}
              </div>
              <span className="task-text">{t.task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
