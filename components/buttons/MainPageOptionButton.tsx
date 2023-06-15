"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/mainPageOptionButton.module.css";
import { Shadows_Into_Light } from "next/font/google";

const neuchaLight = Shadows_Into_Light ({ weight: "400", subsets: ["latin"], display: "swap" });

export default function MainPageOptionButton(props: any) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  function buttonClicked() {
    const onClickFunction = props.onClick;
    onClickFunction();
    setIsButtonClicked(true);
  }

  return (
    <button className={`${neuchaLight.className} ${styles.button}`}>
      {props.children}
    </button>
  );
}
