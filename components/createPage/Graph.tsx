import { ResponsiveLine, Line } from "@nivo/line";
import CustomToolTip from "../CustomToolTip";

export default function Graph({ data }: { data: any[] }) {
  const nivoGraphData = data ? [{ id: 1, data: data }] : [{ id: 1, data: [] }];

  function getDomain() {
    let i = 0;
    let domain;
    while (data && data[i] && !data[i].x) {
      i++;
      domain = data[data.length - 1].x - data[i].x + 1;
    }
    return domain;
  }

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <ResponsiveLine
          margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
          data={nivoGraphData}
          curve={"monotoneX"}
          colors={"red"}
          enableGridX={false}
          enableGridY={false}
          animate={true}
          isInteractive
          useMesh
          enableCrosshair={false}
          xScale={{ type: "linear", min: "auto", max: "auto" }}
          yScale={{
            type: "linear",
            min: 0,
            max: 10,
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 8,
            tickValues: getDomain(),
            format: (e) => Math.floor(e) === e && e,
          }}
          axisLeft={{ tickSize: 0, tickPadding: 8 }}
          pointSize={10}
          pointColor={"white"}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          tooltip={CustomToolTip}
          motionConfig={"wobbly"}
          lineWidth={4}
          enableArea={false}
          areaOpacity={0.8}
          // defs={[
          //   {
          //     id: "gridLines",
          //     type: "patternSquares",
          //     size: 50,
          //     padding: 3,
          //     stagger: false,
          //     background: "brown",
          //     color: "#FBF4E6",
          //   },
          // ]}
          // fill={[{ match: "*", id: "gridLines" }]}
          // theme={{background: "#87CEEB"}}
        />
      </div>
    </>
  );
}
// import React, { useEffect } from "react";
// import { createGraphNodes } from "../../lib/createGraphNodes";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { eventType } from "../../lib/types";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function Graph({ events }: { events: eventType }) {
//   const nodeData = events.length > 0 ? createGraphNodes(events) : null;
//   const nodes = nodeData
//     ? nodeData.periodNodes.concat(nodeData.yearNodes)
//     : null;

//   const minYear = events.length > 0 ? events[0].nextYear : 1900;
//   var maxYear = minYear + 1;

//   if (events.length === 1) {
//     maxYear = events[0].nextYear + 1;
//   } else if (events.length > 1) {
//     maxYear = events.slice(-1)[0].nextYear - 1;
//   }

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       x: {
//         type: "linear",
//         grid: {
//           display: false,
//         },
//         min: minYear,
//         max: maxYear,
//         ticks: {
//           callback: function (value: any) {
//             if (Math.floor(value) === value) {
//               return value;
//             }
//           },
//         },
//       },
//       y: {
//         type: "linear",
//         grid: {
//           display: false,
//         },
//         min: -1,
//         max: 11,
//         ticks: {
//           autoSkip: false,
//           stepSize: 1,
//           callback: function (value: any) {
//             return value % 5 === 0 ? value : "";
//           },
//         },
//       },
//     },
//     cubicInterpolationMode: "monotone",
//     //tension: 0.4
//   };

//   const data = {
//     datasets: [
//       {
//         data: nodes
//           ? nodes.sort(function (a, b) {
//               return a.x - b.x;
//             })
//           : [],
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//         parsing: {
//           xAxisKey: "x",
//           yAxisKey: "y",
//         },
//       },
//     ],
//   };
//   // @ts-expect-error
//   return <Line options={options} data={data} />;
// }
