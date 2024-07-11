import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/header';
import Footer from './components/footer';
import './components/Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(true);

  const sendMessage = async (text) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/chat', {
        message: text,
      });

      const botReply = response.data.reply;
      setMessages([...messages, { text: text, isUser: true }, { text: botReply, isUser: false }]);
      setWelcomeMessage(false);
    } catch (error) {
      console.error('Error fetching response from Google API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {welcomeMessage && (
          <div className="welcome-message" style={{ marginTop:'15%'}}>
            Welcome to PsephologistLLM
          </div>
        )}
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={message.isUser ? 'message user-message' : 'message bot-message'}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          sendMessage(e.target.message.value);
          e.target.message.value = '';
        }} className="chat-input-form">
          <input type="text" name="message" placeholder="Type your message..." className="chat-input" />
          <button type="submit" className="chat-button">Send</button>
        </form>
        {loading && <div className="loading">Loading...</div>}
      </div>
      <Footer />
    </div>
  );
};

export default Chatbot;
