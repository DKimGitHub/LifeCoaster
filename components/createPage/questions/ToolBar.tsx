import React, { useState } from "react";
import { UseFormHandleSubmit, FieldValues } from "react-hook-form";
import styles from "../../../styles/createPage/form.module.css";

import { dataType, eventType } from "../../../lib/types";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function ToolBar({
  handlePrevButton,
  handleNextButton,
  questionPageNum,
  handleSubmit,
  reset,
  mode,
  setMode,
  setEvents,
}: {
  handlePrevButton: () => void;
  handleNextButton: (data: dataType) => void;
  questionPageNum: number;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: () => void;
  mode?: "period" | "year";
  setMode?: React.Dispatch<React.SetStateAction<"period" | "year">>;
  setEvents?: React.Dispatch<React.SetStateAction<eventType>>;
}) {
  const setModeToolBar = setMode ? setMode : () => null;
  const setEventsToolBar = setEvents ? setEvents : () => null;

  function handleMode(
    event: React.MouseEvent<HTMLElement>,
    newMode: "period" | "year"
  ) {
    console.log(newMode);
    setModeToolBar(newMode);
    if ((newMode === "period")) {
      setEventsToolBar((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev.slice(-1)[0],
          type: "period",
        },
      ]);
    } else if (newMode === "year"){
      setEventsToolBar((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev.slice(-1)[0],
          type: "specificYear",
        },
      ]);
    }
  }

  return (
    <div className={styles.tool}>
      <div style={{ flex: "1" }}>
        <button className={styles.resetButton} onClick={reset}>
          Reset
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <button className={styles.prevButton} onClick={handlePrevButton}>
          Prev
        </button>
        {(() => {
          if (questionPageNum === 4) {
            return (
              <div>
                <ToggleButtonGroup
                  size={"small"}
                  value={mode}
                  exclusive
                  onChange={handleMode}>
                  <ToggleButton value="period">Period</ToggleButton>
                  <ToggleButton value="year">Year</ToggleButton>
                </ToggleButtonGroup>
              </div>
            );
          }
        })()}
        <button
          className={styles.nextButton}
          onClick={handleSubmit(handleNextButton)}>
          Next
        </button>
      </div>
      <div style={{ flex: "1" }}></div>
    </div>
  );
}
