"use client";
import React from "react";
import { ResponsiveLine, Line } from "@nivo/line";
import { mockData1 } from "../lib/mockData";
import CustomToolTip from "./CustomToolTip";

export default function LifeGraph() {
  return (
    <div className="h-full rounded-lg border border-black bg-white">
      <ResponsiveLine
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        data={mockData1}
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
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={"white"}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}

        tooltip={CustomToolTip}
      />
    </div>
  );
}
