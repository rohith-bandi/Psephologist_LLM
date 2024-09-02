import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import Header from './components/header';
import Footer from './components/footer';
import './components/Prediction.css';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend);

const Prediction = () => {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  // Full questions for the dropdown menu
  const questions = [
    "What is the predicted seat count for BJP?",
    "What are the seat gains or losses compared to the previous election?",
    "Which party is likely to win the most seats?",
    "Is BJP likely to maintain its majority?",
    "Is Congress predicted to gain more seats?",
    "Which party is likely to experience the most significant decline in support?",
    "What is the chance of a coalition government forming?",
    "Which party has the highest probability of forming the government?",
    "What is the expected overall performance of each party?",
    "What is the predicted change in seat count for each party?"
  ];

  useEffect(() => {
    axios.get('/predicted_seat_counts.json')
      .then((response) => {
        const data = response.data;
        setChartData({
          labels: Object.keys(data),
          datasets: [{
            label: 'Seat Distribution',
            data: Object.values(data),
            backgroundColor: [
              '#FF9F40',
              '#36A2EB',
              '#FFCE56',
              '#DC143C',
              '#000000',
              '#008000',
              '#0000CD',
              '#FF6384'
            ],
            hoverBackgroundColor: [
              '#FF9F40',
              '#36A2EB',
              '#FFCE56',
              '#DC143C',
              '#000000',
              '#008000',
              '#0000CD',
              '#FF6384'
            ]
          }]
        });
      })
      .catch((error) => console.error('Error loading chart data:', error));
  }, []);

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

  // Custom legend component
  const Legend = ({ data }) => {
    const { labels, datasets } = data;
    const { backgroundColor } = datasets[0];
    return (
      <div className="chart-legend">
        {labels.map((label, index) => (
          <div key={index} className="chart-legend-item">
            <div
              className="chart-legend-color"
              style={{ backgroundColor: backgroundColor[index] }}
            ></div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div className="main-content">
        {chartData && (
          <>
            <div className="chart-legend">
              <Legend data={chartData} />
            </div>
            <div className="chart-container">
              <Pie
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      display: false // Hide default legend
                    }
                  }
                }}
              />
            </div>
          </>
        )}
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
          {answer && <div className="answer" dangerouslySetInnerHTML={{ __html: answer }} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Prediction;
