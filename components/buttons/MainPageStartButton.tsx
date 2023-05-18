"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/mainPageStartButton.module.css";

export default function MainPageStartButton(props: any) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  function buttonClicked() {
    const onClickFunction = props.onClick;
    onClickFunction();
    setIsButtonClicked(true);
  }

  var buttonClassName = !isButtonClicked ? styles.button : styles.buttonClicked;

  return (
    <button onClick={buttonClicked} className={buttonClassName}>
      START
    </button>
  );
}
