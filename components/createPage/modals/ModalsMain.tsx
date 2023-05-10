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
  reset,
  graphId,
  setEventId,
  setSpecificYearId,
}: {
  modalPageNum: number;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  graphId: String;
  setEventId: React.Dispatch<React.SetStateAction<String>>;
  setSpecificYearId: React.Dispatch<React.SetStateAction<String>>;
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

  function skipClicked() {
    setModalPageNum(3);
  }

  const skipButton =
    modalPageNum === 2 ? <button onClick={skipClicked}>Skip</button> : <></>;

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
                  graphId,
                  setEventId,
                  setSpecificYearId,
                }}
              />
            );
            break;
          default:
            return;
        }
      })()}
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          width: "100%",
        }}>
        {skipButton}
      </div>
    </Modal>
  );
}
