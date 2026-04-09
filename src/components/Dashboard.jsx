import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheckSquare, FiSquare, FiPlus, FiClock, FiCalendar, FiArrowRight, FiMoreHorizontal, FiPlay, FiBell, FiStar, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import './Dashboard.css';

const chartData = [
  { day: 'Mon', minutes: 30 },
  { day: 'Tue', minutes: 60 },
  { day: 'Wed', minutes: 45 },
  { day: 'Thu', minutes: 90 }, 
  { day: 'Fri', minutes: 50 },
  { day: 'Sat', minutes: 80 },
  { day: 'Sun', minutes: 40 },
];

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', subject: '', duration: '', deadline: '' });
  const [newCat, setNewCat] = useState('');
  const [activeMode, setActiveMode] = useState('Study');
  const [openTaskMenu, setOpenTaskMenu] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/progress');
      setTasks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/categories');
      setCategoryData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5001/api/progress/${id}`, { completed: !currentStatus });
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.name) return;
    try {
      await axios.post('http://localhost:5001/api/progress', { task: `${newTask.subject ? newTask.subject + ' - ' : ''}${newTask.name}`, duration: newTask.duration });
      setNewTask({ name: '', subject: '', duration: '', deadline: '' });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async (e) => {
    if(e.key === 'Enter' && newCat.trim() !== '') {
      try {
        const randColor = colors[Math.floor(Math.random() * colors.length)];
        await axios.post('http://localhost:5001/api/categories', { name: newCat, color: randColor });
        setNewCat('');
        fetchCategories();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard-container animate-fade-in-up">
      
      {/* 1. Hero Block */}
      <div className="glass-card card-hero">
        <h1 className="hero-title">Plan Smarter.<br/>Study Better.</h1>
        <p className="hero-subtitle">Your all-in-one study planner powered by PrepBot</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('/planner')}>Get Started</button>
        </div>
      </div>

      {/* 2. Weekly Progress Chart */}
      <div className="glass-card card-progress">
        <div className="widget-header">
          <span>Weekly Progress</span>
          <span className="dots"><FiMoreHorizontal opacity={0.7} /></span>
        </div>
        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '2rem', marginTop: '-1rem' }}>Minutes studied</p>
        <div style={{ height: '320px', width: '100%' }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} contentStyle={{ background: '#2e1065', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="minutes" radius={[10, 10, 10, 10]} barSize={12}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.day === 'Thu' ? '#F472B6' : 'rgba(244, 114, 182, 0.4)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Today's Tasks */}
      <div className="glass-card card-tasks" style={{ position: 'relative' }}>
        <div className="widget-header">
          <span>Today's Tasks</span>
          <span className="dots"><FiMoreHorizontal /></span>
        </div>
        <div className="task-list" style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {tasks.length === 0 ? <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>No tasks today!</p> : tasks.map((t) => (
            <div className="task-item" key={t.id} style={{ position: 'relative' }}>
              <div className="task-left" onClick={() => toggleTask(t.id, t.completed)}>
                {t.completed ? <FiCheckSquare color="var(--primary-color)" size={18} /> : <FiSquare size={18} opacity={0.6}/>}
                <span style={{ textDecoration: t.completed ? 'line-through' : 'none', opacity: t.completed ? 0.6 : 1 }}>
                  {t.task}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="task-duration">{t.duration || '1h'}</span>
                <span style={{ cursor: 'pointer', padding: '0.2rem' }} onClick={() => setOpenTaskMenu(openTaskMenu === t.id ? null : t.id)}>
                  <FiMoreHorizontal />
                </span>
              </div>
            </div>
          ))}
        </div>
        {openTaskMenu && (
          <div style={{ position: 'absolute', right: '1rem', top: '3rem', background: '#fff', color: '#333', padding: '0.5rem', borderRadius: '8px', zIndex: 100, minWidth: '150px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#e63946', fontSize: '0.9rem' }} onClick={() => setOpenTaskMenu(null)}><FiTrash2 /> delete</div>
            <div style={{ padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem' }} onClick={() => setOpenTaskMenu(null)}><FiEdit2 /> edit</div>
            <div style={{ padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem' }} onClick={() => setOpenTaskMenu(null)}><FiBell /> set as reminder</div>
            <div style={{ padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem' }} onClick={() => setOpenTaskMenu(null)}><FiStar /> make as priority</div>
          </div>
        )}
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <Link to="/progress" style={{ fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>View All &rarr;</Link>
        </div>
      </div>

      {/* 4. Study Categories */}
      <div className="glass-card card-categories">
        <div className="widget-header">
          <span>Study Categories</span>
          <span className="dots"><FiMoreHorizontal /></span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input 
            type="text" 
            placeholder="Type and press Enter to add..." 
            value={newCat} 
            onChange={(e) => setNewCat(e.target.value)}
            onKeyDown={handleAddCategory}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.4)', outline: 'none' }}
          />
        </div>
        <div style={{ maxHeight: '160px', overflowY: 'auto' }}>
          {categoryData.length === 0 ? <p style={{fontSize: '0.8rem', opacity: 0.7}}>Add a new sub above!</p> : categoryData.map(cat => (
            <div className="cat-item" key={cat.id || cat.name}>
              <div className="cat-left">
                <div className="cat-icon" style={{ background: cat.color }}>
                  {cat.name.charAt(0).toUpperCase()}
                </div>
                <span>{cat.name}</span>
              </div>
              <span className="cat-count">0 tasks &rsaquo;</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Add New Task (Dark Card) */}
      <div className="glass-card card-add-task">
        <div className="widget-header">
          <span>Add New Task</span>
          <span className="dots" style={{background: 'rgba(255,255,255,0.1)'}}><FiMoreHorizontal /></span>
        </div>
        <form onSubmit={handleAddTask}>
          <div className="dark-form-inputs">
            <input className="dark-input" placeholder="Task name" value={newTask.name} onChange={e => setNewTask({...newTask, name: e.target.value})} required/>
            <input className="dark-input" placeholder="Subject" value={newTask.subject} onChange={e => setNewTask({...newTask, subject: e.target.value})} />
            <input className="dark-input" placeholder="Duration (hrs)" type="number" step="0.5" value={newTask.duration} onChange={e => setNewTask({...newTask, duration: e.target.value})} />
          </div>
          <button type="submit" className="add-task-btn-full">+ Add Task</button>
        </form>
      </div>

      {/* 6. Modes Widget */}
      <div className="glass-card card-modes">
        <div className="widget-header" style={{ marginBottom: '1rem' }}>
          <span>Focus Modes ✨</span>
          <span className="dots"><FiMoreHorizontal /></span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div onClick={() => navigate('/timer?mode=pomodoro')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.4)', padding: '1rem', borderRadius: '12px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, color: 'var(--text-color)' }}><span style={{fontSize: '1.4rem'}}>🍅</span> Pomodoro</div>
            <div style={{ opacity: 0.7, fontSize: '0.9rem', color: 'var(--text-color)' }}>25m + 5m &rsaquo;</div>
          </div>
          <div onClick={() => navigate('/timer?mode=quick')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.4)', padding: '1rem', borderRadius: '12px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, color: 'var(--text-color)' }}><span style={{fontSize: '1.4rem'}}>⚡</span> Quick Study</div>
            <div style={{ opacity: 0.7, fontSize: '0.9rem', color: 'var(--text-color)' }}>15 min &rsaquo;</div>
          </div>
          <div onClick={() => navigate('/timer?mode=deep')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.4)', padding: '1rem', borderRadius: '12px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, color: 'var(--text-color)' }}><span style={{fontSize: '1.4rem'}}>🎯</span> Deep Focus</div>
            <div style={{ opacity: 0.7, fontSize: '0.9rem', color: 'var(--text-color)' }}>50 min &rsaquo;</div>
          </div>
        </div>
      </div>

      {/* 7. Quick Actions */}
      <div className="glass-card card-quick-actions">
        <div className="widget-header">
          <span>Quick Actions</span>
          <span className="dots"><FiMoreHorizontal /></span>
        </div>
        <div>
          <div className="qa-item" onClick={() => navigate('/timer')}>
            <span>Start focus sessions</span>
            <div className="qa-icon-wrap"><FiPlay size={16}/></div>
          </div>
          <div className="qa-item" onClick={() => navigate('/timer')}>
            <span>Start Timer</span>
            <div className="qa-icon-wrap"><FiClock size={16}/></div>
          </div>
          <div className="qa-item" onClick={() => navigate('/planner')}>
            <span>Open Planner</span>
            <div className="qa-icon-wrap"><FiCalendar size={16}/></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
