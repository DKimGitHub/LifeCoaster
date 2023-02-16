import React from "react";

import styles from "../../../styles/createPage/form.module.css";
import { eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";

export default function PeriodToggleSelected({
  setEvents,
}: {
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
}) {

  function onChange(value: number){
    
  }

  return (
    <div className={styles.subContainer}>
      <h1 className={styles.label}>
        What is the average satisfactory level within this period?
      </h1>
      <div style={{ width: "50%" }}>
        <Slider />
      </div>
    </div>
  );
}
