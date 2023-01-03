"use client";
import React, { useState } from "react";
import { ResponsiveLine, Line } from "@nivo/line";
// import { mockData1 } from "../lib/mockData";
import CustomToolTip from "./CustomToolTip";
let mockData1 = [
  {
    id: "1",
    color: "hsl(0, 100%, 50%)",
    data: [
      {
        x: 0,
        y: 10,
        title: "When I was born :D",
        desc: "it was so zen~",
      },
      {
        x: 5,
        y: 7,
        title: "met my best friend :O",
        desc: "he was an asshole at first~",
      },
      {
        x: 6,
        y: 1,
        title: "dad went to get milk",
        desc: "still waiting...",
      },
      {
        x: 12,
        y: 9,
        title: "got my first A+",
        desc: "mom bought me a pen!!",
      },
      {
        x: 18,
        y: 1,
        title: "went to college",
        desc: "fk..",
      },
    ],
  },
];
export default function LifeGraph(data: any) {
  const [data1, setdata] = useState(mockData1);
  function handler() {
    setdata((prev) => [
      {
        id: "1",
        color: "hsl(0, 100%, 50%)",
        data: [
          ...prev[0].data,
          {
            x: 20,
            y: 10,
            title: "When I was born :D",
            desc: "it was so zen~",
          },
        ],
      },
    ]);
    console.log(data1);
  }
  return (
    <>
      <button className="absolute z-10" onClick={handler}>
        {" "}
        add{" "}
      </button>
      <div className="h-full rounded-lg border border-black bg-white">
        <ResponsiveLine
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          data={data1}
          curve={"cardinal"}
          enableGridX={false}
          enableGridY={false}
          animate={true}
          isInteractive
          useMesh
          enableCrosshair={false}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
          }}
          colors={{ scheme: "nivo" }}
          pointSize={10}
          pointColor={"white"}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          tooltip={CustomToolTip}
          motionConfig={"wobbly"}
        />
      </div>
    </>
  );
}
