import React, { useState, useContext, useEffect, AnimationEvent } from "react";
import styles from "../../../styles/createPage/yearOverlay.module.css";
import { CreatePageContext } from "../../../lib/CreatePageContext";

export default function YearOverlay() {
  const { events, setQuestionPageNum } = useContext(CreatePageContext);

  function handleAnimationEnd(e: AnimationEvent<HTMLDivElement>) {
    setQuestionPageNum(4);
  }

  return (
    <>
      <div className={styles.container} onAnimationEnd={handleAnimationEnd}>
        {events.slice(-2)[0].bigEvent === events.slice(-1)[0].bigEvent - 1 ? (
          <p className={styles.text}>{`${events.slice(-2)[0].bigEvent}`}</p>
        ) : (
          <p className={styles.text}>{`${events.slice(-2)[0].bigEvent} ~ ${
            events.slice(-1)[0].bigEvent
          }`}</p>
        )}
      </div>
    </>
  );
}
