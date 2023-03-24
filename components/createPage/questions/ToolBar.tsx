import React, { useState } from "react";
import { UseFormHandleSubmit, FieldValues } from 'react-hook-form';
import styles from "../../../styles/createPage/form.module.css"

import { dataType } from "../../../lib/types";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function ToolBar({
  handlePrevButton,
  handleNextButton,
  questionPageNum,
  handleSubmit,
  reset,
  mode,
  setMode,
}: {
  handlePrevButton: () => void;
  handleNextButton:(data: dataType) => void;
  questionPageNum: number;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: () => void;
  mode?:"period"|"year";
  setMode?: React.Dispatch<React.SetStateAction<"period" | "year">>;
}) {

  const setModeToolBar = setMode? setMode : () => null;

  function handleMode(
    event: React.MouseEvent<HTMLElement>,
    newMode: "period" | "year"
  ) {
    setModeToolBar(newMode);
  }
  

  return (
    <div className={styles.tool}>
      <div style={{ flex: "1" }}>
        <button className={styles.resetButton} onClick={reset}>Reset</button>
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
        <button className={styles.nextButton} onClick={handleSubmit(handleNextButton)}>
          Next
        </button>
      </div>
      <div style={{ flex: "1" }}></div>
    </div>
  );
}
