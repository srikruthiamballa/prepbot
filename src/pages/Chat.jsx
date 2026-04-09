import React, { useState } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import './Pages.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm PrepBot, your AI Exam Planner. How can I assist you with your study plans or deadline optimizations today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5001/api/chat', { messages: newMsgs });
      setMessages([...newMsgs, { role: 'assistant', content: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMsgs, { role: 'assistant', content: "Sorry! It seems I can't reach the AI server right now. Did you setup your OpenAI Key in the .env file and restart the Node server?" }]);
    }
    setLoading(false);
  };

  return (
    <div className="page-container animate-fade-in-up">
       <div className="page-header">
        <h1 className="text-gradient">AI Planner & Optimizer</h1>
        <p>Chat with PrepBot for personalized schedules and deadline advice.</p>
      </div>

      <div className="chat-container card-container">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.role}`}>
               {m.content}
            </div>
          ))}
          {loading && <div className="chat-bubble assistant">Thinking...</div>}
        </div>

        <form onSubmit={sendMessage} className="chat-input-area">
          <input 
            type="text" 
            placeholder="e.g. Generate a 2-day revision plan for Physics..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.75rem' }}>
            <FiSend size={20}/>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
