import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/modal.module.css";
import { customStyles } from "../../../styles/createPage/modalCustomStyle"

export default function CreatePageIntroModal(props: any) {
  const { updateIsIntroModalOpen, updateIsAgeModalOpen } =
    useContext(CreatePageContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  }, [props]);

  function closeModal() {
    setIsModalOpen(false);
  }

  function buttonClicked() {
    updateIsIntroModalOpen(false);
    setIsModalOpen(false);
    updateIsAgeModalOpen(true);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Continue Modal"
      ariaHideApp={false}
      closeTimeoutMS={150}
      shouldCloseOnOverlayClick={false}
      style={customStyles}>
      <div className={styles.container}>
        {"Welcome to Life Coaster... explanation ...Let's begin"}
        <button className={styles.button} onClick={buttonClicked}>
          Next
        </button>
      </div>
    </Modal>
  );
}
