import React, { useContext } from "react";
import Modal from "react-modal";

import { CreatePageContext } from "../../../lib/CreatePageContext";

import AgeModal from "../../../components/createPage/modals/AgeModal";
import ContinueModal from "../../../components/createPage/modals/ContinueModal";
import IntroModal from "../../../components/createPage/modals/IntroModal";
import { customStyles } from "../../../styles/createPage/modalCustomStyle";

export default function ModalsMain() {
  const { isModalOpen, setIsModalOpen, modalPageNum } =
    useContext(CreatePageContext);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      ariaHideApp={false}
      closeTimeoutMS={150}
      shouldCloseOnOverlayClick={false}
      style={customStyles}>
      {(() => {
        switch (modalPageNum) {
          case 1:
            return (
              <ContinueModal />
            );
            break;
          case 2:
            return <IntroModal />;
            break;
          case 3:
            return (
              <AgeModal />
            );
            break;
          default:
            return;
        }
      })()}
    </Modal>
  );
}
