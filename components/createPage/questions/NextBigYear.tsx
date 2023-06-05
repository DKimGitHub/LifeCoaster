import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ToolBar from "./ToolBar";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, eventType } from "../../../lib/types";
import Select from "../tools/YearSelect";
import PageTransition from "../../PageTransition";

export default function NextBigYear({
  questionPageNum,
  setQuestionPageNum,
  events,
  setEvents,
  reset,
  graphId,
  eventId,
  specificYearId,
  setEventId,
  setSpecificYearId,
  setIsCompleteModalOpen,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  graphId: String;
  eventId: String;
  specificYearId: String;
  setEventId: React.Dispatch<React.SetStateAction<String>>;
  setSpecificYearId: React.Dispatch<React.SetStateAction<String>>;
  setIsCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  /*
  If the current period is the period right after the birth year, 
  the period starts from birth year + 1. Otherwise, the period starts from the previous year.
  */
  useEffect(() => {
    setValue("yearSelect", events.slice(-1)[0].nextYear + 1);
  }, [setValue, events]);

  function handlePrevButton() {
    updateDBDeleteEvent();
    
    deleteEvent();
    events.length === 2 ? setQuestionPageNum(1) : setQuestionPageNum(4);
  }

  function handleNextButton(data: dataType) {
    setQuestionPageNum(3);
    updateEventsNextYear(data.yearSelect);
    updateDBNextYear(data.yearSelect);
  }

  async function updateDBDeleteEvent() {
    await fetch(`/api/post/graph/event/${eventId}/deleteEvent`);
    const newEventId = await getDBLatestEventId();
    setEventId(newEventId);
    await updateDBBornValue(newEventId);
  }

  async function updateDBBornValue(newEventId: String) {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: newEventId,
        },
        data: {
          period: {
            update: {
              value: 0,
            },
          },
        },
      }),
    };
    await fetch("/api/post/graph/event", options);
  }

  async function getDBLatestEventId() {
    const response = await fetch(`/api/post/graph/${graphId}/getLatestEvent`);
    const data = await response.json();
    return data ? data[0] : "";
  }

  function deleteEvent() {
    setEvents((prev) => {
      return [...prev.slice(0, -1)];
    });
  }

  function updateEventsNextYear(value: number) {
    setEvents((prev) => {
      return [
        ...prev,
        {
          nextYear: value,
          type: null,
          period: { value: 0, description: "" },
          specificYear: [],
        },
      ];
    });
  }

  async function updateDBNextYear(value: number) {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: eventId,
        },
        data: {
          nextYear: value,
        },
      }),
    };
    await fetch("/api/post/graph/event", options);
  }

  return (
    <form className={styles.questionContainer}>
      <div className={styles.toolContainer}>
        <ToolBar
          {...{
            handlePrevButton,
            handleNextButton,
            questionPageNum,
            handleSubmit,
            reset,
            setEvents,
            eventId,
            setIsCompleteModalOpen,
          }}
        />
      </div>
      <PageTransition>
        <div className={styles.question}>
          <label className={styles.questionText}>
            When was your next big event?
          </label>
          <div
            style={{
              height: "fit-content",
              display: "flex",
              flexDirection: "row",
            }}>
            <p
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                width: "fit-content",
              }}>{`${events.slice(-1)[0].nextYear} ~ `}</p>
            <Controller
              name="yearSelect"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  reverse={false}
                  onChange={onChange}
                  start={events.slice(-1)[0].nextYear + 1}
                  end={new Date().getFullYear()}
                  defaultValue={events.slice(-1)[0].nextYear + 1}
                />
              )}
            />
            {errors.yearSelect && (
              <p style={{ display: "inline", color: "red" }}>
                {errors.yearSelect.message as string}
              </p>
            )}
          </div>
        </div>
      </PageTransition>
    </form>
  );
}
