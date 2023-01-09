"use client";

import styles from "./lifeChartListPage.module.css";
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
    padding: 5,
  },
  //aspectRatio: 3,
  maintainAspectRatio: false,
  cubicInterpolationMode: "monotone",
};
const graphData = [
  { x: 0, y: 0 },
  { x: 30, y: 0 },
  { x: 20, y: 10 },
  { x: 14, y: 2 },
  { x: 1, y: 8 },
].sort((a, b) => a.x - b.x);

export const data = {
  datasets: [
    {
      label: "Dataset 1",
      data: graphData,
      borderColor: "hsl(0,0%,50%)",
    },
  ],
};

export default function LifeChart(props: any) {
  const { colorTheme } = props;
  //const ranNumDeg = Math.floor((Math.random() * (360)))+ "deg";

  return (
    <div className="relative">
      <div
        data-theme={colorTheme}
        className={`${styles.chartContainer} peer relative z-10 border-4 border-solid bg-base-100 transition-transform duration-300 ease-in-out hover:translate-y-2`}>
        <Line className="h-50" options={options} data={data} />
      </div>
      <div
        className={`${styles.tab} absolute flex w-full top-0 z-[-1] rounded-t-md bg-accent px-2 text-accent-content transition-transform duration-300 ease-in-out peer-hover:-translate-y-4 `}>
        <div className="flex-1">John Smith</div> <div className="flex-none">{"   "} 3 hearts</div>
      </div>
    </div>
  );
}
