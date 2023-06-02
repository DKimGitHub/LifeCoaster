import React from "react";
import styles from "../../../styles/createPage/modal.module.css";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin ({weight: '400', subsets: ['latin'], display: 'swap'})

export default function ContinueModal(
  {
    setModalPageNum,
    setIsModalOpen,
    reset,
  }:
  {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  }
) {

  function beginningButtonClick() {
    setModalPageNum(2);
    reset();
  }

  function continueButtonClick() {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalPageNum(NaN);
    }, 1000);
  }

  return (
    <div className={`${styles.container} ${pangolin.className}`}>
      <button className={styles.button} onClick={beginningButtonClick}>
        Start from beginning
      </button>
      <button className={styles.button} onClick={continueButtonClick}>
        Continue from saved
      </button>
    </div>
  );
}
