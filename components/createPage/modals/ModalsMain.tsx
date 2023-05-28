import React, {useState} from "react";
import Modal from "react-modal";

import AgeModal from "../../../components/createPage/modals/AgeModal";
import ContinueModal from "../../../components/createPage/modals/ContinueModal";
import IntroModal from "../../../components/createPage/modals/IntroModal";
import { customStyles } from "../../../styles/createPage/modalCustomStyle";
import { eventType } from "../../../lib/types";
import styles from "../../../styles/createPage/modal.module.css";
import { Pangolin } from "next/font/google";
import "../../../styles/createPage/modal.css";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function ModalsMain({
  modalPageNum,
  setModalPageNum,
  setQuestionPageNum,
  setEvents,
  reset,
  graphId,
  setEventId,
  setSpecificYearId,
  isModalOpen,
  setIsModalOpen
}: {
  modalPageNum: number;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  graphId: String;
  setEventId: React.Dispatch<React.SetStateAction<String>>;
  setSpecificYearId: React.Dispatch<React.SetStateAction<String>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //Opens the modal if the modal page number is not NaN.

  function skipClicked() {
    setModalPageNum(3);
  }

  const skipButton =
    modalPageNum === 2 ? (
      <button onClick={skipClicked} className={`${styles.skipButton} ${pangolin.className}`}>
        Skip
      </button>
    ) : (
      <></>
    );

  return (
    <Modal
      isOpen={isModalOpen}
      contentLabel="Modal"
      ariaHideApp={false}
      closeTimeoutMS={1500}
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
                  setIsModalOpen,
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
