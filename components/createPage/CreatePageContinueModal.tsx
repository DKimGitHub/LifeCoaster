import React, { useState, useContext, useEffect } from "react";
import Modal from 'react-modal';

import { CreatePageContext } from "../../lib/CreatePageContext";
import styles from "../../styles/createPage/continueModal.module.css";

function CreatePageAgeModal(props: any) {
  const { updateisAgeModalOpen, updateIsContinueModalOpen, reset } =
    useContext(CreatePageContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen)
  },[props])

  function closeModal() {
    setIsModalOpen(false);
  }

  function beginningButtonClick() {
    setIsModalOpen(false);
    updateisAgeModalOpen(true);
    updateIsContinueModalOpen(false);
    reset();
  }

  function continueButtonClick() {
    setIsModalOpen(false);
    updateisAgeModalOpen(false);
    updateIsContinueModalOpen(false);
  }

  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      marginX: "auto",
      maxWidth: "72rem",
      maxHeight: "36rem",
    },
    overlay: {
      backgroundColor: "hsla(0,0%,0%,0.3)",
    },
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Continue Modal"
        ariaHideApp={false}
        closeTimeoutMS={150}
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <button className={styles.button} onClick={beginningButtonClick}>
          Start from beginning
        </button>
        <button className={styles.button} onClick={continueButtonClick}>
          Continue from saved
        </button>
      </Modal>{" "}
    </>
  );
}

export default CreatePageAgeModal;
