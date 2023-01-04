import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend:{
      display: false
    }
  },
  scales: {
    x:{
      type: 'linear',
      grid:{
        display: false
      },
      min: 1995,
    },
    y:{
      type: 'linear',
      grid:{
        display: false
      },
    }
  },
  cubicInterpolationMode: 'monotone',
  //tension: 0.4
};

export default function Graph(props) {
  const userInput = props.data;

  userInput.sort((a: number, b: number) => a.year - b.year);

  const data = {
    datasets: [
      {
        data: userInput,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        parsing: {
          xAxisKey: 'year',
          yAxisKey: 'value'
        }
      },
    ],
  };
  
  return <Line options={options} data={data} />;
}
