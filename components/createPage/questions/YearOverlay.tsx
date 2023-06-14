import React, { useState, useContext, useEffect, AnimationEvent } from "react";
import styles from "../../../styles/createPage/yearOverlay.module.css";
import { CreatePageContext } from "../../../lib/CreatePageContext";
import { eventType } from "../../../lib/types";
import { Neucha } from "next/font/google";

const neucha = Neucha({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function YearOverlay({
  events,
  setQuestionPageNum,
}: {
  events: eventType;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  function handleAnimationEnd(e: AnimationEvent<HTMLDivElement>) {
    setQuestionPageNum(4);
  }



  return (
    <>
      <div className={`${styles.container} ${neucha.className}`} onAnimationEnd={handleAnimationEnd}>
        {
          //If the two consecutive years differ by one year, display only the starting year
          events.slice(-2)[0].nextYear === events.slice(-1)[0].nextYear - 1 ? (
            <span className={styles.text}>{`${events.slice(-2)[0].nextYear}`}</span>
          ) : (
            <>
              <span className={styles.text}>{events.slice(-2)[0].nextYear}</span>
              <span className={styles.text}> ~ </span>
              <span className={styles.text}>{
                events.slice(-1)[0].nextYear - 1
              }</span>
            </>
          )
        }
      </div>
    </>
  );
}
