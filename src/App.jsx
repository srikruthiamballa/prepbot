import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import Dashboard from './components/Dashboard';

import Progress from './pages/Progress';
import Planner from './pages/Planner';
import Chat from './pages/Chat';
import Timer from './pages/Timer';
import Login from './pages/Login';
import { FiHexagon } from 'react-icons/fi';
import './components/Header.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app-container">
        
        {/* Navigation directly over background */}
        <header className="header glass-header" style={{ background: 'transparent', boxShadow: 'none', padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo cursor-pointer text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.8rem', fontWeight: 700 }}>
            <img src="/logo.png" alt="PrepBot Logo" style={{ width: '38px', height: '38px', objectFit: 'contain', display: 'block' }} />
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>PrepBot</Link>
          </div>
          
          <nav className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/planner" className="nav-link">Planner</Link>
            <Link to="/progress" className="nav-link">Progress</Link>
            <Link to="/chat" className="nav-link">AI Support</Link>
          </nav>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/login" className="btn-secondary" style={{ background: 'transparent', border: 'none', textDecoration: 'none' }}>Log in</Link>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme" style={{ marginLeft: '1rem' }}>
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </div>
        </header>

        <main style={{ paddingBottom: '3rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;
