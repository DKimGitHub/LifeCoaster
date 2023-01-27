import React, { useContext } from "react";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/modal.module.css";

export default function ContinueModal() {
  const { setModalPageNum, setIsModalOpen, reset } = useContext(CreatePageContext);

  function beginningButtonClick() {
    setModalPageNum(2);
    reset();
  }

  function continueButtonClick() {
    setModalPageNum(0);
    setIsModalOpen(false);
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
