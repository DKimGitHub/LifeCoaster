"use client";
import React, { useEffect, useRef, useState } from "react";
import { ResponsiveLine, Line } from "@nivo/line";
import { useSpring, animated } from "@react-spring/web";

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
  const ref = useRef(null);
  const cartRef = useRef(null);
  const handler = () => {
    const svgPath = ref.current.querySelector("path").attributes.d.value;
    cartRef.current.style.offsetPath = `path("${svgPath}")`;
    cartRef.current.classList.add('animateCart')
    console.log(svgPath);
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
    {/* <animated.div className="w-4 h-4 bg-black" style={{offsetDistance}}
    ></animated.div> */}

    <div ref={cartRef} className="w-4 h-4 bg-black absolute invisible" onAnimationEnd={()=> cartRef.current.classList.remove('animateCart')} ></div>
    <div ref={ref} className={`relative h-96 w-full md:w-2/3`}>
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
