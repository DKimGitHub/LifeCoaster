import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";

import { CreatePageContext } from "../../lib/CreatePageContext";
import styles from "../../styles/createPage/modal.module.css";
import { customStyles } from "../../styles/createPage/modalCustomStyle"

function CreatePageAgeModal(props: any) {
  const { updateIsIntroModalOpen, updateIsContinueModalOpen, reset } =
    useContext(CreatePageContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  }, [props]);

  function closeModal() {
    setIsModalOpen(false);
  }

  function beginningButtonClick() {
    setIsModalOpen(false);
    updateIsIntroModalOpen(true);
    updateIsContinueModalOpen(false);
    reset();
  }

  function continueButtonClick() {
    setIsModalOpen(false);
    updateIsIntroModalOpen(false);
    updateIsContinueModalOpen(false);
  }

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
        <div className={styles.container}>
          <button className={styles.button} onClick={beginningButtonClick}>
            Start from beginning
          </button>
          <button className={styles.button} onClick={continueButtonClick}>
            Continue from saved
          </button>
        </div>
      </Modal>{" "}
    </>
  );
}

export default CreatePageAgeModal;
