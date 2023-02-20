import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import YearToggleSelected from "./YearToggleSelected";
import PeriodToggleSelected from "./PeriodToggleSelected";
import styles from "../../../styles/createPage/form.module.css";
import { eventType } from "../../../lib/types";

export default function ValueQuestions({
  setQuestionPageNum,
  events,
  setEvents,
}: {
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const [mode, setMode] = useState<"period" | "year">("period");

  function handleMode(
    event: React.MouseEvent<HTMLElement>,
    newMode: "period" | "year"
  ) {
    setMode(newMode);
  }

  function prevButtonClicked() {
    setEvents((prev) => prev.slice(0, -1));
    setQuestionPageNum(2);
  }

  function nextButtonClicked(input: any) {
    setQuestionPageNum(2);
  }

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(nextButtonClicked)}>
      <ToggleButtonGroup value={mode} exclusive onChange={handleMode}>
        <ToggleButton value="period">Period</ToggleButton>
        <ToggleButton value="year">Year</ToggleButton>
      </ToggleButtonGroup>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={prevButtonClicked}>
        Prev
      </button>
      {(() => {
        if (mode === "period") {
          return <PeriodToggleSelected {...{ setEvents }} />;
        } else if (mode === "year") {
          return <YearToggleSelected {...{ setEvents, events }} />;
        }
      })()}
      <button
        className={`${styles.button} ${styles.right}`}
        onClick={nextButtonClicked}>
        Next
      </button>
    </form>
  );
}
