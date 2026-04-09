import React, { useState, useEffect } from 'react';
import './Pages.css';
import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const Timer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');

  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');
  const [timerType, setTimerType] = useState('focus');

  useEffect(() => {
    setIsActive(false);
    if (mode === 'pomodoro') {
      setSeconds(25 * 60);
      setTimerType('focus');
    } else if (mode === 'quick') {
      setSeconds(15 * 60);
      setTimerType('focus');
    } else if (mode === 'deep') {
      setSeconds(50 * 60);
      setTimerType('focus');
    }
  }, [mode]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setSeconds(25 * 60); // 25 minutes default
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const applyCustomTime = () => {
    const m = parseInt(customMinutes, 10);
    if (!isNaN(m) && m > 0) {
      setIsActive(false);
      setSeconds(m * 60);
      setCustomMinutes('');
    }
  };

  return (
    <div className="page-container animate-fade-in-up" style={{ textAlign: 'center' }}>
      <div className="page-header">
        <h1 className="text-gradient">Focus Timer</h1>
        <p>Stay productive with deep work sessions.</p>
      </div>

      <div className="card-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '4rem 2rem' }}>
        {mode === 'pomodoro' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <div onClick={() => { setTimerType('focus'); setSeconds(25*60); setIsActive(false); }} style={{ fontWeight: timerType==='focus'?700:400, opacity: timerType==='focus'?1:0.6, cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-color)', transition: '0.2s' }}>Focus</div>
            <div onClick={() => { setTimerType('break'); setSeconds(5*60); setIsActive(false); }} style={{ fontWeight: timerType==='break'?700:400, opacity: timerType==='break'?1:0.6, cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-color)', transition: '0.2s' }}>Break</div>
          </div>
        )}
        <h2 style={{ fontSize: '4rem', marginBottom: '1rem' }}>{formatTime(seconds)}</h2>
        
        {!mode && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <input 
              type="number" 
              placeholder="Mins" 
              value={customMinutes} 
              onChange={e => setCustomMinutes(e.target.value)} 
              style={{ width: '80px', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.4)', outline: 'none', color: 'var(--text-color)' }}
            />
            <button className="btn-secondary" onClick={applyCustomTime} style={{ padding: '0.5rem 1rem' }}>Set</button>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn-primary" onClick={toggle} style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isActive ? <FiPause size={20} /> : <FiPlay size={20} />} {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="btn-secondary" onClick={reset} style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRotateCcw size={20} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
