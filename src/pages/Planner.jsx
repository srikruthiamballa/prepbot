import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pages.css';

const Planner = () => {
  const [schedule, setSchedule] = useState([]);
  const [formData, setFormData] = useState({ subject: '', topic: '', duration_hours: '', priority: 'High' });

  useEffect(() => {
    fetchPlanner();
  }, []);

  const fetchPlanner = () => {
    axios.get('http://localhost:5001/api/planner')
      .then(res => setSchedule(res.data.data))
      .catch(err => console.error(err));
  };

  const handleCreatePlan = (e) => {
    e.preventDefault();
    if(!formData.subject || !formData.topic) return;
    
    axios.post('http://localhost:5001/api/planner', formData)
      .then(() => {
        fetchPlanner();
        setFormData({ subject: '', topic: '', duration_hours: '', priority: 'High' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="page-container animate-fade-in-up">
      <div className="page-header">
        <h1 className="text-gradient">Smart Planner</h1>
        <p>Distribute subjects based on priority and duration.</p>
      </div>

      <div className="planner-split">
        {/* Form Section */}
        <div className="card-container planner-form-card">
          <h3>Add Schedule Block</h3>
          <form onSubmit={handleCreatePlan} className="planner-form">
            <input type="text" placeholder="Subject (e.g. Math)" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="input-field" required />
            <input type="text" placeholder="Topic (e.g. Calculus)" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} className="input-field" required />
            <input type="number" placeholder="Duration (Hrs)" value={formData.duration_hours} onChange={e => setFormData({...formData, duration_hours: e.target.value})} className="input-field" required />
            <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="input-field">
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Add to Plan</button>
          </form>
        </div>

        {/* Schedule View */}
        <div className="card-container planner-view-card">
          <h3>Your Schedule</h3>
          {schedule.length === 0 ? (
            <p className="empty-state">No schedule yet. Add a study block!</p>
          ) : (
            <div className="schedule-list">
              {schedule.map(item => (
                <div key={item.id} className="schedule-item">
                  <div className="schedule-meta">
                    <span className={`priority-badge ${item.priority.toLowerCase()}`}>{item.priority}</span>
                    <span className="duration">{item.duration_hours} Hrs</span>
                  </div>
                  <h4>{item.subject}</h4>
                  <p>{item.topic}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Planner;
