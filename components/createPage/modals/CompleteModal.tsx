import { forwardRef, useRef } from "react";
import Modal from "react-modal";
import Image from "next/image";
import styles from "../../../styles/createPage/modal.module.css";
import closeIcon from "../../../public/createPage/close.svg";
import CompleteGraph from "../../createPage/modals/CompleteGraph";
import { eventsToNodes } from "../../../lib/helpers";
import "../../../styles/createPage/completeModal.css"

import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function CompleteModal({
  isCompleteModalOpen,
  setIsCompleteModalOpen,
  events,
}: {
  isCompleteModalOpen: boolean;
  setIsCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  events: any;
}) {
  const printRef = useRef(null);
  
  var customStyles;

  if (window.innerWidth > 600) {
    customStyles = {
      content: {
        top: "40%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "80%",
        height: "70%",
        minWidth: "30%",
        transform: "translate(-50%, -50%)",
        borderRadius: "3rem",
        // border: "2px solid #ff4114",
        color: "#474239",
        backgroundColor: "#fcf8f0",
        padding: "3rem 4rem",
        // boxShadow: "0px 0px 10px 10px #cae3e0"
      },
      overlay: {
        backgroundColor: "#FBF4E6aa",
      },
    };
  } else {
    customStyles = {
      content: {
        top: "20%",
        bottom: "auto",
        minWidth: "30%",
        margin: "-2rem",
        borderRadius: "3rem",
        // border: "2px solid #ff4114",
        color: "#474239",
        backgroundColor: "#fcf8f0",
        padding: "3rem 0.5rem",
        // boxShadow: "0px 0px 10px 10px #cae3e0"
      },
      overlay: {
        backgroundColor: "#FBF4E6aa",
      },
    };
  }

  function closeButtonClicked() {
    setIsCompleteModalOpen(false);
  }

  return (
    <Modal
      isOpen={isCompleteModalOpen}
      contentLabel="Modal"
      ariaHideApp={false}
      closeTimeoutMS={1000}
      shouldCloseOnOverlayClick={false}
      className="CompleteModal"
      overlayClassName="CompleteOverlay">
      <div
        className={pangolin.className}
        style={{ width: "100%", height: "100%"}}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Your Life-Coaster
          </span>
        </div>

        <button style={{ cursor: "pointer" }} onClick={closeButtonClicked}>
          <Image
            src={closeIcon}
            style={{ position: "absolute", left: "85%", top: "5%" }}
            alt="closeIcon"
            width={40}
            height={40}
          />
        </button>
        <CompleteGraph data={eventsToNodes(events)} printRef={printRef} />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            paddingTop: "1rem",
          }}>
          <button className={styles.skipButton} onClick={async () => {
            const { exportComponentAsPNG } = await import('react-component-export-image')
            exportComponentAsPNG(printRef)
          }}>
            Save Image
          </button>
        </div>
      </div>
    </Modal>
  );
}
