import React, { useContext, useState, useEffect } from "react";
import { CreatePageContext } from "../lib/CreatePageContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FormState } from "../lib/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CreatePageGraph() {
  const { userInput, firstNode } = useContext(CreatePageContext);
  const yearBorn = firstNode.dateOfBirth.year
  

  userInput.sort((a: FormState, b: FormState) => a.xValue - b.xValue);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "linear",
        grid: {
          display: false,
        },
        min: yearBorn? yearBorn : 0,
      },
      y: {
        type: "linear",
        grid: {
          display: false,
        },
        min: -11,
        max: 11
      },
    },
    cubicInterpolationMode: "monotone",
    //tension: 0.4
  };

  const data = {
    datasets: [
      {
        data: userInput,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        parsing: {
          xAxisKey: "xValue",
          yAxisKey: "yValue",
        },
      },
    ],
  };
  // @ts-expect-error
  return <Line options={options} data={data} />;
}
