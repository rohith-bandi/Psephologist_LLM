import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BjpChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || typeof data !== 'object') {
          throw new Error("Invalid data format");
        }
        if (data.error) {
          throw new Error(`Server error: ${data.error}`);
        }
        const bjpData = data.bjp;
        if (!bjpData || typeof bjpData !== 'object') {
          throw new Error("BJP data is missing or invalid");
        }
        setChartData({
          labels: Object.keys(bjpData),
          datasets: [
            {
              label: 'Sentiment Distribution of BJP',
              data: Object.values(bjpData),
              backgroundColor: ['red', 'yellow', 'green'],
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message || "An unknown error occurred");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Sentiment Distribution of BJP</h1>
      <Pie data={chartData} options={{
        plugins: {
          datalabels: {
            color: 'black',
            formatter: (value, context) => {
              const sum = context.dataset.data.reduce((acc, val) => acc + val, 0);
              const percentage = (value / sum * 100).toFixed(2) + '%';
              return percentage;
            }
          }
        }
      }} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default BjpChart;
