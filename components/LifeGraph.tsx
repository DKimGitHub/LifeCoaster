"use client";
import React, { useEffect, useRef, useState } from "react";
import { ResponsiveLine, Line } from "@nivo/line";
import TrainSvg from "../public/train.svg";
// import { mockData1 } from "../lib/mockData";
import CustomToolTip from "./CustomToolTip";
import Image from "next/image";

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
        x: 2,
        y: 0,
        title: "I got dropped on my head",
        desc: "owie!!",
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
  const cartRef = useRef(null);
  const handler = () => {
    if (!cartRef.current) return null;
    const cart = cartRef.current as HTMLElement;
    const pathNode = (cart.nextSibling as Element)?.querySelector("svg > g > path");
    //@ts-ignore
    const svgPath = pathNode?.attributes?.d.value;
    cart.style.offsetPath = `path("${svgPath}")`;
    cart.classList.add("animateCart");
  };

  // const [{ offsetDistance }, api] = useSpring({
  //   from: { offsetDistance: "0%" },
  //   loop: {
  //     reverse: true
  //   },
  //   config: {
  //     duration: 4000,
  //   }
  // });

  return (
    <>
      <button onClick={handler}>click</button>
      <div className={`relative h-96 w-full md:w-2/3`}>
        <Image
          src={TrainSvg}
          alt="train"
          width="30"
          height="30"
          ref={cartRef}
          className=" invisible absolute top-5 left-[32px]"
          onAnimationEnd={() => cartRef.current && (cartRef.current as HTMLElement).classList.remove("animateCart")}
        />
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
            min: 0,
            max: 10,
          }}
          axisBottom={{tickSize:0, tickPadding: 8}}
          axisLeft={{tickSize:0, tickPadding: 8}}
          pointSize={8}
          pointColor={"white"}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          tooltip={CustomToolTip}
          motionConfig={"wobbly"}
          lineWidth={4}
          enableArea={true}
          areaOpacity={0.2}
          defs={[
            {
              id: "gridLines",
              type: "patternSquares",
              size: 28,
              padding: 3,
              stagger: false,
              background: "#000000",
              color: "#ffffff",
            },
          ]}
          fill={[{ match: "*", id: "gridLines" }]}
        />
      </div>
    </>
  );
}
