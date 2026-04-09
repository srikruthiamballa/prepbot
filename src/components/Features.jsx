import React from 'react';
import { FiCpu, FiCalendar, FiTrendingUp, FiClock } from 'react-icons/fi';
import './Features.css';

const features = [
  {
    icon: <FiCpu />,
    title: 'AI-Powered Study Plans',
    desc: 'Generates customized daily and weekly study schedules using AI.'
  },
  {
    icon: <FiCalendar />,
    title: 'Smart Planner',
    desc: 'Automatically distributes subjects and topics based on difficulty and priority.'
  },
  {
    icon: <FiTrendingUp />,
    title: 'Progress Tracking',
    desc: 'Track completed tasks and monitor your preparation over time.'
  },
  {
    icon: <FiClock />,
    title: 'Deadline Optimization',
    desc: 'Adjusts study intensity dynamically as your exams approach.'
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="features-header">
        <h2 className="section-title text-gradient">Why Choose PrepBot?</h2>
        <p>Everything you need for structured, personalized, and adaptive exam preparation.</p>
      </div>
      <div className="features-grid">
        {features.map((feat, idx) => (
          <div className="feature-card" key={idx}>
            <div className="feature-icon">{feat.icon}</div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-desc">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
