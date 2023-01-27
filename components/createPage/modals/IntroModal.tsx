import React, {useContext} from "react";
import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/modal.module.css";

export default function IntroModal() {
  const {setModalPageNum} = useContext(CreatePageContext)

  function buttonClicked() {
    setModalPageNum (3)
  }

  return (
    <div className={styles.container}>
      {"Welcome to Life Coaster... explanation ...Let's begin"}
      <button className={styles.button} onClick={buttonClicked}>
        Next
      </button>
    </div>
  );
}
