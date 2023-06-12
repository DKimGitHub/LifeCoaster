import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import ToolBar from "./ToolBar";
import YearToggleSelected from "./YearToggleSelected";
import PeriodToggleSelected from "./PeriodToggleSelected";
import styles from "../../../styles/createPage/form.module.css";
import { eventType } from "../../../lib/types";
import PageTransition from "../../PageTransition";

export default function ValueQuestions({
  questionPageNum,
  setQuestionPageNum,
  events,
  setEvents,
  reset,
  setIsCompleteModalOpen,
  setGraphId,
  setPostId,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  setIsCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphId: React.Dispatch<React.SetStateAction<String>>;
  setPostId: React.Dispatch<React.SetStateAction<String>>;
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
  const startYear =
    events.length > 1
      ? events.slice(-2)[0].nextYear
      : events.slice(-2)[0].nextYear + 1;

  const [range, setRange] = useState<number[]>(
    Array.from(
      Array(events.slice(-1)[0].nextYear - 1 - startYear + 1).keys(),
      (x) => x + startYear
    )
  );

  const previousYear = events.slice(-2)[0].nextYear;
  const currentYear = events.slice(-1)[0].nextYear;

  function handlePrevButton() {    
    deleteEvent();
    if (events.slice(-1)[0].nextYear - 1 !== new Date().getFullYear()){
      setQuestionPageNum(2);
    }
  }

  function handleNextButton(input: any) {
    if (events.slice(-1)[0].nextYear - 1 === new Date().getFullYear()) {
      deleteSpecificYearLastIndex();
      setIsCompleteModalOpen(true);
    } else if (events.slice(-1)[0].nextYear === new Date().getFullYear()) {
      setEvents((prev) => {
        return [
          ...prev, 
          {
            nextYear: new Date().getFullYear() + 1,
            type: "period",
            period: {
              value: 0,
              description: "",
            },
            specificYear: [{
              year: new Date().getFullYear(),
              value: 0,
              description: "",
            }]
          }
        ];
      });
      setQuestionPageNum(3);
    } else {
      deleteSpecificYearLastIndex();
      setQuestionPageNum(2);
    }
  }

  function deleteSpecificYearLastIndex() {
    setEvents((prev) => {
      return [
        ...prev.slice(0, -1),
        {
          ...prev.slice(-1)[0],
          specificYear: [...prev.slice(-1)[0].specificYear.slice(0, -1)],
        },
      ];
    });
  }

  function deleteEvent() {
    setEvents((prev) => {
      return [
        ...prev.slice(0, -2),
        { ...prev.slice(-2)[0], period: { value: 0, description: "" } },
      ];
    });
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
            events,
            setEvents,
            setGraphId,
            setPostId,
            setIsCompleteModalOpen,
          }}
        />
      </div>

      {(() => {
        if (mode === "period") {
          return (
            <PeriodToggleSelected
              {...{ setEvents, defaultValues, setDefaultValues }}
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
                range,
                setRange,
              }}
            />
          );
        }
      })()}
    </div>
  );
}
