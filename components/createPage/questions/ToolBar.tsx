import React, { useState } from "react";
import { UseFormHandleSubmit, FieldValues } from "react-hook-form";
import styles from "../../../styles/createPage/form.module.css";
import Image from "next/image";
import previousIcon from "../../../public/createPage/previous.svg";
import nextIcon from "../../../public/createPage/next.svg";
import resetIcon from "../../../public/createPage/reset.svg";

import { dataType, eventType } from "../../../lib/types";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function ToolBar({
  handlePrevButton,
  handleNextButton,
  questionPageNum,
  handleSubmit,
  reset,
  mode,
  setMode,
  setEvents,
  eventId,
}: {
  handlePrevButton: () => void;
  handleNextButton: (data: dataType) => void;
  questionPageNum: number;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: () => void;
  mode?: "period" | "year";
  setMode?: React.Dispatch<React.SetStateAction<"period" | "year">>;
  setEvents?: React.Dispatch<React.SetStateAction<eventType>>;
  eventId: String;
}) {
  const setModeToolBar = setMode ? setMode : () => null;
  const setEventsToolBar = setEvents ? setEvents : () => null;

  function handleMode(
    event: React.MouseEvent<HTMLElement>,
    newMode: "period" | "year"
  ) {
    setModeToolBar(newMode);
    if (newMode === "period") {
      setEventsToolBar((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev.slice(-1)[0],
          type: "period",
        },
      ]);
    } else if (newMode === "year") {
      setEventsToolBar((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev.slice(-1)[0],
          type: "specificYear",
        },
      ]);
    }
    updateDBAdd(newMode);
  }

  async function updateDBAdd(type: String) {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: eventId,
        },
        data: {
          type: type,
        },
      }),
    };
    const response = await fetch("/api/post/graph/event/", options);
    const data = await response.json();
  }

  return (
    <div className={styles.tool}>
      <div style={{ flex: "1" }}>
        <button className={styles.resetButton} onClick={reset}>
          <Image src={resetIcon} alt="resetIcon" width={30} height={30} />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <button className={styles.prevButton} onClick={handlePrevButton}>
          <Image src={previousIcon} alt="previousIcon" width={40} height={40} />
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
                  <ToggleButton value="period">
                    <span
                      style={{
                        color: "#45302b",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        margin: "0 0.3rem"
                      }}
                      className={pangolin.className}>
                      Period
                    </span>
                  </ToggleButton>
                  <ToggleButton value="year"><span
                      style={{
                        color: "#45302b",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        margin: "0 0.3rem"
                      }}
                      className={pangolin.className}>
                      Year
                    </span></ToggleButton>
                </ToggleButtonGroup>
              </div>
            );
          }
        })()}
        <button
          className={styles.nextButton}
          onClick={handleSubmit(handleNextButton)}>
          <Image src={nextIcon} alt="nextIcon" width={40} height={40} />
        </button>
      </div>
      <div style={{ flex: "1" }}></div>
    </div>
  );
}
