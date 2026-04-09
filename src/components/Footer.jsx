import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <div className="footer-content">
        <p>© {new Date().getFullYear()} PrepBot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
