import React, { useState, useEffect } from "react";
import Modal from "react-modal";

export default function CreatePageIntroModal(props: any) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  // useEffect(() => {
  //   setIsModalOpen(props.isModalOpen);
  // }, [props]);

  function closeModal() {
    setIsModalOpen(false);
  }

  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "50%",
      height: "40%",
      transform: "translate(-50%, -50%)",
      marginX: "auto",
      maxWidth: "72rem",
      maxHeight: "36rem",
      border: "0px",
      color: "white",
      backgroundColor: "hsla(0,0%,0%,0.8)"
    },
    overlay: {
      backgroundColor: "hsla(0,0%,0%,0.2)",
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Continue Modal"
      ariaHideApp={false}
      closeTimeoutMS={150}
      shouldCloseOnOverlayClick={false}
      style={customStyles}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "3rem",
          justifyContent: "center",
          fontWeight: "bold",
          fontFamily: "Courier New"
        }}>
        {"Welcome to Life Coaster... explanation ...Let's begin"}
      </div>
    </Modal>
  );
}
