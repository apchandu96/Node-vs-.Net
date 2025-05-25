import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './App.css';

export default function App() {
  const [echoData, setEchoData] = useState([]);
  const [computeData, setComputeData] = useState([]);

  const runTests = async () => {
    const tests = [
      {
        name: 'Echo',
        endpoints: [
          { name: 'Node.js Echo', url: 'http://localhost:3001/echo?message=test' },
          { name: '.NET Echo',    url: 'http://localhost:3002/echo?message=test' }
        ],
        setter: setEchoData
      },
      {
        name: 'Compute',
        endpoints: [
          { name: 'Node.js Compute', url: 'http://localhost:3001/compute?work=1000000' },
          { name: '.NET Compute',    url: 'http://localhost:3002/compute?work=1000000' }
        ],
        setter: setComputeData
      }
    ];

    for (const test of tests) {
      const results = [];
      for (const ep of test.endpoints) {
        const times = [];
        for (let i = 0; i < 100; i++) {
          const start = performance.now();
          await fetch(ep.url);
          const end = performance.now();
          times.push(end - start);
        }
        results.push({
          name: ep.name.includes('Node.js') ? 'Node.js' : '.NET',
          min: Number(Math.min(...times).toFixed(1)),
          avg: Number((times.reduce((a, b) => a + b, 0) / times.length).toFixed(1)),
          max: Number(Math.max(...times).toFixed(1))
        });
      }
      test.setter(results);
    }
  };

  const renderBarChart = (data, title) => (
    <div className="chart-card">
      <h2>{title}</h2>
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="min" name="Min" fill="#8884d8" />
            <Bar dataKey="avg" name="Avg" fill="#82ca9d" />
            <Bar dataKey="max" name="Max" fill="#ff7f50" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );

  return (
    <div className="dashboard">
      <h1>Node.js vs .NET Performance Dashboard</h1>
      <button onClick={runTests}>Run All Tests</button>
      <div className="charts-container">
        {renderBarChart(echoData, 'Echo Latency (ms)')}
        {renderBarChart(computeData, 'Compute Time (ms)')}
      </div>
    </div>
  );
}
