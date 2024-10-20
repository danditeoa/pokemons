import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const PokemonStatsChart = ({ stats }) => {
  const data = {
    labels: stats.map(stat => stat.stat.name),
    datasets: [
      {
        label: 'Base Stats',
        data: stats.map(stat => stat.base_stat),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>Gráfico de Estatísticas</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PokemonStatsChart;
