import React, { useState } from "react";
import styles from "../../../styles/createPage/modal.module.css";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function IntroModal({
  setModalPageNum,
}: {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  function prevButtonClicked() {
    if (introPageNum === 1) {
      setIntroPageNum(1);
      setModalPageNum(1);
    } else {
      setIntroPageNum((prev) => prev - 1);
    }
  }

  function nextButtonClicked() {
    if (introPageNum === 8) {
      setIntroPageNum(1);
      setModalPageNum(3);
    } else {
      setIntroPageNum((prev) => prev + 1);
    }
  }

  const [introPageNum, setIntroPageNum] = useState<number>(1);

  var text;

  switch (introPageNum) {
    case 1:
      text =
        "Welcome to Life Coaster, the ultimate tool for visualizing the ups and downs of your life journey.";
      break;
    case 2:
      text =
        "Whether you're looking to reflect on the past, or make positive changes for the future, Life Coaster is the perfect companion to help you navigate life's twists and turns.";
      break;
    case 3:
      text =
        "So, buckle up and get ready to ride the highs and lows with us. Let's start your journey today!";
      break;
    case 4:
      text = "Instructions";
      break;
    case 5:
      text =
        "1. Once you have chosen the year of your birth, indicate your level of satisfaction with being born into this world..";
      break;
    case 6:
      text =
        "2. Select the year during which significant events took place in your life, and based on those events, you will rate the period from the year of the last significant event until the year you have chosen..";
      break;
    case 7:
      text =
        "For example, if the last significant event in your life took place in 2003 and the next significant event occurred in 2007, you will be rating the period from 2003 to 2006..";
      break;
    case 8:
      text =
        "3. You have the option to rate the entire period as a whole or provide individual ratings for specific years within that period..";
      break;
    default:
      text = "";
  }

  return (
    <div className={`${styles.container} ${pangolin.className}`}>
      <span
        style={{
          marginTop: "2rem",
          lineHeight: "1.8",
        }}>
        <center>{text}</center>
      </span>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}>
        {/* <button className={styles.button} onClick={prevButtonClicked}>
          Prev
        </button> */}
        <button className={styles.button} onClick={nextButtonClicked}>
          Next
        </button>
      </div>
    </div>
  );
}
