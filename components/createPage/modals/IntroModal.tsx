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
      {"Welcome to Life Coaster... explanation ...Let's begin"}
      <button className={styles.button} onClick={nextButtonClicked}>
        Next
      </button>
    </div>
  );
}
