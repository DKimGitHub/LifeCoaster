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
  eventId,
  setEventId,
  graphId,
  specificYearId,
  setIsCompleteModalOpen,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  eventId: String;
  setEventId: React.Dispatch<React.SetStateAction<String>>;
  graphId: String;
  specificYearId: String;
  setIsCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  const previousYear = events.slice(-2)[0].nextYear;
  const currentYear = events.slice(-1)[0].nextYear;

  function handlePrevButton() {
    updateEventNextYear();
    updateDBNextYear();
    setQuestionPageNum(2);
  }

  function handleNextButton(input: any) {
    if (events.slice(-1)[0].nextYear === new Date().getFullYear()) {
      setIsCompleteModalOpen(true);
      setQuestionPageNum(NaN);
    } else {
      setQuestionPageNum(2);
      createNewEvent();
      updateDBCreateNewEvent();
    }
  }

  function updateEventNextYear() {
    setEvents((prev) => {
      return [
        ...prev.slice(0, -1),
        {
          nextYear: previousYear,
          type: null,
          period: { value: 0, description: "" },
          specificYear: [],
        },
      ];
    });
  }

  async function updateDBNextYear() {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: eventId,
        },
        data: {
          nextYear: 0,
          type: null,
          period: { update: { value: 0, description: "" } },
          specificYear: { deleteMany: { eventId: eventId } },
        },
      }),
    };
    await fetch("/api/post/graph/event", options);
  }

  function createNewEvent() {
    setEvents((prev) => {
      return [
        ...prev,
        {
          nextYear: currentYear + 1,
          type: null,
          period: { value: 0, description: "" },
          specificYear: [],
        },
      ];
    });
  }

  async function updateDBCreateNewEvent() {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: graphId,
        },
        data: {
          event: {
            create: [
              {
                nextYear: currentYear + 1,
                type: null,
                period: {
                  create: { value: 0, description: "" },
                },
                specificYear: {
                  create: [],
                },
              },
            ],
          },
        },
        include: {
          event: {
            include: {
              specificYear: true,
            },
          },
        },
      }),
    };
    const response = await fetch("/api/post/graph/", options);
    const data = await response.json();
    setEventId(data.event.slice(-1)[0].id);
    // setSpecificYearId(data.event.slice(-1)[0]?.specificYear.slice(-1)[0]?.id);
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
            setIsCompleteModalOpen,
          }}
        />
      </div>

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
                eventId,
              }}
            />
          );
        }
      })()}
    </div>
  );
}
