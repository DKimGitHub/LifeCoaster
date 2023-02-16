import React from "react";
import Modal from "react-modal";

import AgeModal from "../../../components/createPage/modals/AgeModal";
import ContinueModal from "../../../components/createPage/modals/ContinueModal";
import IntroModal from "../../../components/createPage/modals/IntroModal";
import { customStyles } from "../../../styles/createPage/modalCustomStyle";
import { eventType } from "../../../lib/types";

export default function ModalsMain({
  modalPageNum,
  setModalPageNum,
  setQuestionPageNum,
  setEvents,
  setNumPeriods,
  reset,
}: {
  modalPageNum: number;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  setNumPeriods: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
}) {
  //Opens the modal if the modal page number is not NaN.
  var isModalOpen;
  if (!Number.isNaN(modalPageNum)) {
    isModalOpen = true;
  } else {
    isModalOpen = false;
  }

  function closeModal() {
    setModalPageNum(NaN);
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
            return <ContinueModal {...{ setModalPageNum, reset }} />;
            break;
          case 2:
            return <IntroModal {...{ setModalPageNum }} />;
            break;
          case 3:
            return (
              <AgeModal
                {...{
                  setModalPageNum,
                  setQuestionPageNum,
                  setEvents,
                  setNumPeriods,
                }}
              />
            );
            break;
          default:
            return;
        }
      })()}
    </Modal>
  );
}
