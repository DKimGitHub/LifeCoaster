import React from "react";
import styles from "../../../styles/createPage/modal.module.css";

export default function IntroModal({
  setModalPageNum,
}: {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  function nextButtonClicked() {
    setModalPageNum(3);
  }

  return (
    <div className={styles.container}>
      {
        "Welcome to Life Coaster, the ultimate tool for visualizing the ups and downs of your life journey. Whether you're looking to reflect on the past, or make positive changes for the future, Life Coaster is the perfect companion to help you navigate life's twists and turns. So, buckle up and get ready to ride the highs and lows with us. Let's start your journey today!"
      }
      <button className={styles.button} onClick={nextButtonClicked}>
        Next
      </button>
    </div>
  );
}
