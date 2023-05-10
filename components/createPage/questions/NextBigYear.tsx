import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ToolBar from "./ToolBar";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, eventType } from "../../../lib/types";
import Select from "../tools/YearSelect";

export default function NextBigYear({
  questionPageNum,
  setQuestionPageNum,
  events,
  setEvents,
  setNumPeriods,
  reset, 
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  setNumPeriods: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
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
    events.length === 1
      ? setValue("yearSelect", events.slice(-1)[0].nextYear + 1)
      : setValue("yearSelect", events.slice(-1)[0].nextYear);
  }, [setValue, events]);

  function handlePrevButton() {
    events.length === 1 ? setQuestionPageNum(1) : setQuestionPageNum(4);
  }

  function handleNextButton(data: dataType) {
    setQuestionPageNum(3);
    setNumPeriods((prev) => prev + 1);
    /*
    The length of events is greater than numPeriod 
    if the current page has been reached from the next page (i.e. by clicking prev from the next page)
    */

    setEvents((prev) => {
      console.log(prev);
      return [
        ...prev,
        {
          nextYear: data.yearSelect,
          type: null,
          period: { value: NaN, description: "" },
          specificYear: [],
        },
      ];
    });
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
          }}
        />
      </div>
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
    </form>
  );
}
