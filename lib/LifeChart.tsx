"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      type: "linear",
      grid: { display: false },
    },
    y: {
      type: "linear",
      grid: { display: false },
      display: false,
    },
  },
  interaction: {
    mode: "nearest",
    intersect: false,
  },
  aspectRatio: 3,
   cubicInterpolationMode: "monotone",

};

export const data = {
  datasets: [
    {
      label: "Dataset 1",
      data: [
        { x: 0, y: 0 },
        { x: 1995, y: 20 },
        { x: 2010, y: 100 },
      ],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "hsl(0,0%,100%)",
    },
  ],
};

export default function LifeChart() {
  return <Line options={options} data={data} />;
}
