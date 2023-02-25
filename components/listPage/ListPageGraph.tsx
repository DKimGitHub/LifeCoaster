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
  defaults,
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
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      type: "linear",
      grid: { display: false },
      display: false,
    },
    y: {
      type: "linear",
      grid: { display: false },
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 0,
    },
  },
  interaction: {
    mode: "nearest",
    intersect: false,
  },
  layout: {
    padding: {
      top: 25,
    },
  },
  //aspectRatio: 3,
  maintainAspectRatio: false,
  cubicInterpolationMode: "monotone",
};

export default function ListPageGraph({ data }: { data: any }) {
  const graphData = data?.sort(
    (a, b) => a.x - b.x
  );
  const lineData: ChartData<"line", { x: number; y: number }[]> = {
    datasets: [
      {
        label: "Dataset 1",
        data: graphData,
        borderColor: "hsl(0,0%,50%)",
      },
    ],
  };

  return (
    // @ts-expect-error
    <Line options={options} data={lineData} />
  );
}
