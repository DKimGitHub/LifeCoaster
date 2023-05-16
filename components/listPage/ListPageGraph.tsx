"use client";

import { ResponsiveLine } from "@nivo/line";

export default function ListPageGraph({ data }: { data: any[] | null }) {
  const nivoGraphData = data ? [{ id: 1, data: data }] : [{ id: 1, data: [] }];

  return (
    <ResponsiveLine
      margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
      data={nivoGraphData}
      curve={"cardinal"}
      enableGridX={false}
      enableGridY={false}
      animate={true}
      enableCrosshair={false}
      xScale={{ type: "linear", min: "auto", max: "auto" }}
      yScale={{
        type: "linear",
        min: 0,
        max: 10,
      }}
      axisBottom={null}
      axisLeft={null}
      enablePoints={false}
      lineWidth={4}
      enableArea={true}
      areaOpacity={0.4}
      defs={[
        {
          id: "gridLines",
          type: "patternSquares",
          size: 50,
          padding: 3,
          stagger: false,
          background: "#3f301d",
          color: "#ffffff",
        },
      ]}
      fill={[{ match: "*", id: "gridLines" }]}
    />
  );
}
