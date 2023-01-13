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
      top:25
    },
  },
  parsing: {
    xAxisKey: 'xValue',
    yAxisKey: 'yValue'
  },
  //aspectRatio: 3,
  maintainAspectRatio: false,
  cubicInterpolationMode: "monotone",
};
// const graphData = [
//   { x: 0, y: 0 },
//   { x: 30, y: 1 },
//   { x: 20, y: 10 },
//   { x: 14, y: 2 },
//   { x: 1, y: 8 },
// ].sort((a, b) => a.x - b.x);

export default function ListPageGraph(props: any) {
  //const { colorTheme } = props;
  const graphData = props.data?.graph.nodes.sort((a, b) => a.xValue - b.xValue)
  const data = {
    datasets: [
      {
        label: "Dataset 1",
        data: graphData,
        borderColor: "hsl(0,0%,50%)",
      },
    ],
  };
  //const ranNumDeg = Math.floor((Math.random() * (360)))+ "deg";

  return (
      // @ts-expect-error
    <Line options={options} data={data} />
  );
}
