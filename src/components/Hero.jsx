import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero bg-grid animate-fade-in-up">
      <div className="hero-content">
        <h1 className="hero-title text-gradient">
          Master Your Exams with AI
        </h1>
        <p className="hero-subtitle">
          PrepBot is a smart exam preparation platform designed to help students plan, organize, and optimize their study routines automatically.
        </p>
        <div className="hero-cta">
          <button className="btn-primary">Get Your Study Plan</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
