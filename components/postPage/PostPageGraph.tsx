"use client";
import React, { useEffect, useRef, useState } from "react";
import { ResponsiveLine, Line } from "@nivo/line";
import TrainSvg from "../../public/train.svg";
// import { mockData1 } from "../lib/mockData";
import CustomToolTip from "../CustomToolTip";
import Image from "next/image";
import { Node } from "@prisma/client";
import { Button, css } from "@nextui-org/react";

export default function PostPageGraph({
  data,
}: {
  data: Node[] | undefined;
}) {
  const cartRef = useRef(null);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const nivoGraphData = data ? [{ id: 1, data: data }] : [{id: 1, data: []}];
  const startCartAnimation = () => {
    if (!cartRef.current) return null;
    setTimeout(()=>setIsCartAnimating(true), 500);
    const cart = cartRef.current as HTMLElement;
    const pathNode = (cart.nextSibling as Element)?.querySelector(
      "svg > g > path"
    );
    //@ts-ignore
    const svgPath = pathNode?.attributes?.d.value;
    cart.style.offsetPath = `path("${svgPath}")`;
    cart.classList.add("animateCart");
    setTimeout(()=>setIsCartAnimating(false), 5000);
  };

  return (
    <>
      <div className={`py-auto relative h-[14rem] w-full md:h-[80vh] md:w-2/3`}>
        {!isCartAnimating && <Button shadow light auto onClick={startCartAnimation}
        css={{
          zIndex: 20,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "0.5rem",
        }}>
          Ride~
        </Button>
        }
        <Image
          src={TrainSvg}
          alt="train"
          width="30"
          height="30"
          ref={cartRef}
          className=" invisible absolute top-4 left-[20px] z-10"
          onAnimationEnd={() =>
            cartRef.current &&
            (cartRef.current as HTMLElement).classList.remove("animateCart")
          }
        />
        <ResponsiveLine
          margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
          data={nivoGraphData}
          curve={"cardinal"}
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
          axisBottom={{ tickSize: 0, tickPadding: 8 }}
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
          // theme={{background: "#87CEEB"}}
        />
      </div>
    </>
  );
}
