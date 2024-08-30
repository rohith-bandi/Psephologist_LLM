import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/header';
import Footer from './components/footer';
import './components/Prediction.css';

const Prediction = () => {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const questions = [
    "Predicted seat count for BJP",
    "Seat changes compared to previous election",
    "Party likely to win most seats",
    "BJP maintaining majority",
    "Congress gaining more seats",
    "Party likely to experience decline in support",
    "Chance of coalition government forming",
    "Party with highest probability of forming government",
    "Expected overall performance of each party",
    "Predicted change in seat count for each party",
    // "Which party is likely to experience a decline in voter support in the upcoming election?",
    // "Is there a strong chance of a coalition government forming post-election?",
    // "Which party has the highest probability of forming the government in the upcoming election?",
    // "What is the expected overall performance of each party in the upcoming election?",
    // "What is the predicted change in seat count for each party?",
    // "What is the major impact of the future winning party on their success in upcoming elections?",
    // Add more predefined questions as needed
  ];

  const fetchAnswer = async (question) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/predict', {
        question: question,
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', width: '70%', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '15%' }}>
        <div className="prediction-container">
          <h2>Select a Prediction Question</h2>
          <select
            value={selectedQuestion}
            onChange={(e) => setSelectedQuestion(e.target.value)}
            className="question-dropdown"
          >
            <option value="">Select a question...</option>
            {questions.map((question, index) => (
              <option key={index} value={question}>{question}</option>
            ))}
          </select>
          <button
            onClick={() => fetchAnswer(selectedQuestion)}
            className="btn btn-primary"
            disabled={!selectedQuestion || loading}
          >
            Get Prediction
          </button>
          {loading && <div className="loading">Loading...</div>}
          {answer && <div className="answer" dangerouslySetInnerHTML={{ __html: answer }} style={{width:'70%',alignItems:'center',marginLeft:'15%'}} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Prediction;
