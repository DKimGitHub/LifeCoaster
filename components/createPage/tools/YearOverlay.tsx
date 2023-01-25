import React, { useContext} from "react";
import styles from "../../../styles/createPage/yearOverlay.module.css";

export default function YearOverlay(props: any) {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.text}>{`${props.prevBigEvent} ~ {$}`</p>
      </div>
    </>
  );
}
