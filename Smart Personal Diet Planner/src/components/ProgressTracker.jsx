// src/components/ProgressTracker.js

import React from 'react';
import { Line } from 'react-chartjs-2';

const ProgressTracker = () => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [70, 69.5, 69, 68.5, 68],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="container">
      <h2>Progress Tracker</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressTracker;
