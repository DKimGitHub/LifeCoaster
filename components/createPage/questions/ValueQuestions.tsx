import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import ToolBar from "./ToolBar"
import YearToggleSelected from "./YearToggleSelected";
import PeriodToggleSelected from "./PeriodToggleSelected";
import styles from "../../../styles/createPage/form.module.css";
import { eventType } from "../../../lib/types";

export default function ValueQuestions({
  questionPageNum,
  setQuestionPageNum,
  events,
  setEvents,
  reset,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const [mode, setMode] = useState<"period" | "year">("period");

  function handlePrevButton() {
    setEvents((prev) => prev.slice(0, -1));
    setQuestionPageNum(2);
  }

  function handleNextButton(input: any) {
    setQuestionPageNum(2);
  }

  return (
    <div className={styles.questionContainer}>
      <div className={styles.toolContainer}>
        <ToolBar
          {...{
            handlePrevButton,
            handleNextButton,
            questionPageNum,
            handleSubmit,
            reset,
            mode,
            setMode,
          }}
        />
      </div>
      <div className={styles.question}>
        {(() => {
          if (mode === "period") {
            return <PeriodToggleSelected {...{ setEvents }} />;
          } else if (mode === "year") {
            return <YearToggleSelected {...{ setEvents, events }} />;
          }
        })()}
      </div>
    </div>
  );
}
