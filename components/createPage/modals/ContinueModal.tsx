import React from "react";
import styles from "../../../styles/createPage/modal.module.css";

export default function ContinueModal(
  {
    setModalPageNum,
    reset,
  }:
  {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
  }
) {

  function beginningButtonClick() {
    setModalPageNum(2);
    reset();
  }

  function continueButtonClick() {
    setModalPageNum(NaN);
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={beginningButtonClick}>
        Start from beginning
      </button>
      <button className={styles.button} onClick={continueButtonClick}>
        Continue from saved
      </button>
    </div>
  );
}
