import React, { useState, useContext, useEffect, AnimationEvent } from "react";
import styles from "../../../styles/createPage/yearOverlay.module.css";
import { CreatePageContext } from "../../../lib/CreatePageContext";

export default function YearOverlay() {
  const { nextBigEvent, prevBigEvent, setQuestionPageNum } = useContext(CreatePageContext);

  function handleAnimationEnd (e: AnimationEvent<HTMLDivElement>){
    setQuestionPageNum(4);
  }

  return (
    <>
      <div className={styles.container} onAnimationEnd={handleAnimationEnd}>
        <p className={styles.text}>{`${prevBigEvent} ~ ${nextBigEvent}`}</p>
      </div>
    </>
  );
}
