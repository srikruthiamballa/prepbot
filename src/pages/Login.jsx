import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/Dashboard.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    if(email) setStep(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Simulated Login sent for ${email}!`);
  };

  return (
    <div className="dashboard-container animate-fade-in-up" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gridTemplateColumns: '1fr' }}>
      <div className="glass-card" style={{ padding: '3rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h2 className="text-gradient" style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Welcome Back</h2>
        <p style={{ opacity: 0.8, marginBottom: '2rem', fontSize: '0.9rem' }}>Log in to access your saved prep plans.</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {step === 1 && (
            <>
              <input 
                type="email" 
                placeholder="Email Address" 
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.85)', color: '#111', border: '1px solid rgba(0,0,0,0.3)', fontWeight: 500 }} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit" onClick={handleNext} className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.8rem' }}>Continue</button>
              <div style={{ margin: '1rem 0', opacity: 0.6, fontSize: '0.85rem' }}>OR</div>
              <button type="button" className="btn-secondary" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#fff', color: '#333' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="18" height="18" /> Continue with Google
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ textAlign: 'left', fontSize: '0.85rem', marginBottom: '-0.5rem', color: 'var(--text-color)', opacity: 0.8 }}>
                Logging in as <strong>{email}</strong>
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.85)', color: '#111', border: '1px solid rgba(0,0,0,0.3)', fontWeight: 500 }} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button type="submit" onClick={handleLogin} className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.8rem' }}>Log in</button>
              <button type="button" onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', marginTop: '1rem', cursor: 'pointer', fontWeight: 600 }}>&lsaquo; Back to Email</button>
            </>
          )}
        </form>

        <p style={{ marginTop: '2rem', fontSize: '0.85rem' }}>
          Don't have an account? <Link to="#" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
