"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/mainPageOptionButton.module.css";

export default function MainPageOptionButton(props: any) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  function buttonClicked() {
    const onClickFunction = props.onClick;
    onClickFunction();
    setIsButtonClicked(true);
  }

  return (
    <button className={styles.button}>
      {props.children}
    </button>
  );
}
