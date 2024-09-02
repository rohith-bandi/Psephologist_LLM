import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import data from './components/extracted_data.json';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Dataanalysis = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('');
    const [states, setStates] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const [analysisResult, setAnalysisResult] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedYear) {
            const yearData = data[selectedYear];
            const stateNames = yearData.map(item => Object.keys(item)[0]);
            setStates(stateNames);
        } else {
            setStates([]);
        }
    }, [selectedYear]);

    useEffect(() => {
        if (selectedYear && selectedState) {
            const stateData = data[selectedYear].find(item => item[selectedState]);
            if (stateData) {
                const newConstituencies = stateData[selectedState];
                setConstituencies(newConstituencies);
            } else {
                setConstituencies([]);
            }
        } else {
            setConstituencies([]);
        }
    }, [selectedYear, selectedState]);

    const prepareChartData = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            const partyData = {};
            data.forEach((row) => {
                const { Party, total_votes } = row;
                partyData[Party] = total_votes;
            });

            const newChartData = {
                labels: Object.keys(partyData),
                datasets: [
                    {
                        label: `Party wise performance${selectedConstituency ? ` for ${selectedConstituency} constituency` : ''}${selectedState ? ` in ${selectedState.replace(/_/g, ' ')}` : ''} in ${selectedYear}`,
                        data: Object.values(partyData),
                        backgroundColor: [
                            'red',
                            'yellow',
                            'green',
                            'blue',
                            'purple',
                            'orange',
                            'cyan',
                            'magenta',
                        ],
                    },
                ],
            };
            setChartData(newChartData);
        } else {
            setChartData(null);
        }
    };

    const handleAnalyze = async () => {
        let prompt = '';
        if (selectedYear) prompt += ` for the year ${selectedYear}`;
        if (selectedState) prompt += ` in ${selectedState.replace(/_/g, ' ')}`;
        if (selectedConstituency) prompt += ` for ${selectedConstituency} constituency`;

        if (prompt) {
            setLoading(true);
            prompt = `Give me party wise performance${prompt}`;
            console.log('Generated Prompt:', prompt);
            try {
                const response = await fetch('http://127.0.0.1:5000/api/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt }),
                });
                const result = await response.json();
                setAnalysisResult(result);
                prepareChartData(result);
            } catch (error) {
                console.error('Error analyzing data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const years = Object.keys(data);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <h1 style={{ marginLeft: '37%' }}>Indian Election analysis</h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div className="btn btn-primary shadow" style={{ margin: '4%' }}>
                    <label htmlFor="select-year">Select Year:</label>
                    <select id="select-year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="form-control">
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="btn btn-primary shadow" style={{ margin: '4%' }}>
                    <label htmlFor="select-state">Select State:</label>
                    <select id="select-state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="form-control">
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state} value={state}>
                                {state.replace(/_/g, ' ')}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="btn btn-primary shadow" style={{ margin: '4%' }}>
                    <label htmlFor="select-constituency">Select Constituency:</label>
                    <select id="select-constituency" value={selectedConstituency} onChange={(e) => setSelectedConstituency(e.target.value)} className="form-control">
                        <option value="">Select Constituency</option>
                        {constituencies.map((constituency) => (
                            <option key={constituency} value={constituency}>
                                {typeof constituency === 'string' ? constituency.replace(/_/g, ' ') : String(constituency)}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={handleAnalyze} className="btn btn-light" style={{ margin: '4%' }}>Analyze</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', minHeight: '54vh', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#ece2e2', marginLeft: '10%', marginRight: '10%', paddingTop: '3%', paddingBottom: '3%', borderRadius: '20px' }}>
                {loading ? <p>Loading...</p> : chartData ? <Bar data={chartData} options={{
                    // plugins: {
                    //     datalabels: {
                    //         color: 'black',
                    //         formatter: (value, context) => {
                    //             const sum = context.dataset.data.reduce((acc, val) => acc + val, 0);
                    //             const percentage = (value / sum * 100).toFixed(2) + '%';
                    //             return percentage;
                    //         }
                    //     }
                    // }
                }} plugins={[ChartDataLabels]} style={{ maxWidth: '1500px', maxHeight: '600px' }} /> : null}
                {/* {Array.isArray(analysisResult) && analysisResult.length > 0 && (
                    <div style={{ backgroundColor: '#383636', padding: '1%', borderRadius: '10px' }}>
                        <h3>Analysis Result:</h3>
                        <ul>
                            {analysisResult.map((item, index) => (
                                <li key={index}>
                                    {item.Party}: {item.total_votes}
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}
            </div>
            <Footer />
        </div>
    );
};

export default Dataanalysis;