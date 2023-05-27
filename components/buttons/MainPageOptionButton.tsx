"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/mainPageOptionButton.module.css";
import { Kalam } from "next/font/google";

const kalamLight = Kalam({ weight: "400", subsets: ["latin"], display: "swap" });

export default function MainPageOptionButton(props: any) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  function buttonClicked() {
    const onClickFunction = props.onClick;
    onClickFunction();
    setIsButtonClicked(true);
  }

  return (
    <button className={`${kalamLight.className} ${styles.button}`}>
      {props.children}
    </button>
  );
}
