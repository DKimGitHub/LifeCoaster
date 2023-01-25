import React, { useContext } from "react";
import styles from "../../../styles/createPage/yearOverlay.module.css";
import { CreatePageContext } from "../../../lib/CreatePageContext";

export default function YearOverlay(props: any) {
  const { nextBigEvent } = useContext(CreatePageContext);

  return (
    <>
      <div className={styles.container}>
        <p
          className={
            styles.text
          }>{`${props.prevBigEvent} ~ ${nextBigEvent}`}</p>
      </div>
    </>
  );
}
