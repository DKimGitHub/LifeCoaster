import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import ToolBar from "./ToolBar";
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
  eventId,
  specificYearId,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  eventId: String;
  specificYearId: String;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const [mode, setMode] = useState<"period" | "year">("period");
  const [defaultValues, setDefaultValues] = useState<number[]>([
    0,
    events.length > 2
      ? events.slice(-2)[0].nextYear
      : events.slice(-2)[0].nextYear + 1,
    0,
  ]);
  /*
      index 0: Period tab value slider
      index 1: Year tab select year
      index 2: Year tab value slider
    */

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
            setEvents,
            eventId,
          }}
        />
      </div>
      <div className={styles.question}>
        {(() => {
          if (mode === "period") {
            return (
              <PeriodToggleSelected
                {...{ setEvents, defaultValues, setDefaultValues, eventId }}
              />
            );
          } else if (mode === "year") {
            return (
              <YearToggleSelected
                {...{
                  setEvents,
                  events,
                  defaultValues,
                  setDefaultValues,
                  specificYearId,
                  eventId
                }}
              />
            );
          }
        })()}
      </div>
    </div>
  );
}
