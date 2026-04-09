import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="header">
      <div className="logo cursor-pointer text-gradient">
        PrepBot
      </div>
      <nav className="nav-links">
        <a href="#features" className="nav-link">Features</a>
        <a href="#planner" className="nav-link">Planner</a>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
