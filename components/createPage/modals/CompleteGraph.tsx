"use client";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { ResponsiveLine, Line } from "@nivo/line";
import TrainSvg from "../../../public/train.svg";
// import { mockData1 } from "../lib/mockData";
import CustomToolTip from "../../CustomToolTip";
import Image from "next/image";
import { Node } from "@prisma/client";
import { Button, css } from "@nextui-org/react";
import { MutableRefObject } from "react";
import styles from "../../../styles/createPage/completeModal.module.css";
import { Press_Start_2P } from "next/font/google";

const pressStart2p = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const CompleteGraph = forwardRef(function CompleteGraph({
  data,
  printRef,
}: {
  data: any[];
  printRef: MutableRefObject<null>;
}) {
  const cartRef = useRef(null);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const nivoGraphData = data ? [{ id: 1, data: data }] : [{ id: 1, data: [] }];
  const startCartAnimation = () => {
    if (!cartRef.current) return null;
    setTimeout(() => setIsCartAnimating(true), 500);
    const cart = cartRef.current as HTMLElement;
    const pathNode = (cart.nextSibling as Element)?.querySelector(
      "svg > g > path"
    );
    //@ts-ignore
    const svgPath = pathNode?.attributes?.d.value;
    cart.style.offsetPath = `path("${svgPath}")`;
    cart.classList.add("animateCart");
    setTimeout(() => setIsCartAnimating(false), 5000);
  };

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
      {!isCartAnimating && (
        <button
          onClick={startCartAnimation}
          className={`${styles.playButton} ${pressStart2p.className}`}>
          Play
        </button>
      )}

      <div ref={printRef} style={{ width: "100%", height: "80%" }}>
        <Image
          src={TrainSvg}
          alt="train"
          width="30"
          height="30"
          ref={cartRef}
          style={{
            position: "absolute",
            top: "8.2rem",
            
            zIndex: "10",
            left: "6rem",
          }}
          onAnimationEnd={() =>
            cartRef.current &&
            (cartRef.current as HTMLElement).classList.remove("animateCart")
          }
        />
        <ResponsiveLine
          margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
          data={nivoGraphData}
          curve={"monotoneX"}
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
          axisBottom={{ tickSize: 0, tickPadding: 8, tickValues: getDomain() }}
          axisLeft={{ tickSize: 0, tickPadding: 8 }}
          pointSize={8}
          pointColor={"white"}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          tooltip={CustomToolTip}
          motionConfig={"gentle"}
          lineWidth={4}
          enableArea={true}
          areaOpacity={0.8}
          colors="red"
          defs={[
            {
              id: "gridLines",
              type: "patternSquares",
              size: 50,
              padding: 3,
              stagger: false,
              background: "black",
              color: "#fcf8f0",
            },
          ]}
          fill={[{ match: "*", id: "gridLines" }]}
          // theme={{background: "#87CEEB"}}
        />
      </div>
    </>
  );
});

export default CompleteGraph;
