import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { dataType, DOBType } from "../lib/types";
import { CreatePageContext } from "../lib/CreatePageContext";
import styles from "../styles/continueModal.module.css";

function CreatePageAgeModal() {
  const { updateisAgeModalOpen, updateIsContinueModalOpen, reset} = useContext(CreatePageContext);

  function beginningButtonClick(){
    updateisAgeModalOpen(true);
    updateIsContinueModalOpen(false);
    reset();
  }

  function continueButtonClick(){
    updateisAgeModalOpen(false);
    updateIsContinueModalOpen(false);
  }

  return (
    <>
      <button className={styles.button} onClick={beginningButtonClick}>
        Start from beginning
      </button>
      <button className={styles.button} onClick={continueButtonClick}>
        Continue from saved
      </button>
    </>
  );
}

export default CreatePageAgeModal;
