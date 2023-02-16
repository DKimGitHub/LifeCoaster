import React, { useContext, useEffect, useState } from "react";
import { CreatePageContext } from "../../lib/CreatePageContext";
import { createGraphNodes } from "./tools/createGraphNodes";
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
import CustomTooltip from "../Tooltip";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
); 

export default function Graph() {
  const { nodes, phantomNodes, events } = useContext(CreatePageContext);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: CustomTooltip,
      },
    },
    scales: {
      x: {
        type: "linear",
        grid: {
          display: false,
        },
        min: events[0].bigEvent,
        ticks: {
          callback: function (value: any) {
            if (Math.floor(value) === value) {
              return value;
            }
          },
        },
      },
      y: {
        type: "linear",
        grid: {
          display: false,
        },
        min: -6,
        max: 6,
        ticks: {
          autoSkip: false,
          stepSize: 1,
          callback: function (value: any) {
            return value % 5 === 0 ? value : "";
          },
        },
      },
    },
    cubicInterpolationMode: "monotone",
    //tension: 0.4
  };

  const data = {
    datasets: [
      {
        data: nodes.concat(phantomNodes).sort(function (a, b) {
          return a.xValue - b.xValue;
        }),
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
