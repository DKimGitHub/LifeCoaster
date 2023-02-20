import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, eventType } from "../../../lib/types";
import Select from "../tools/YearSelect";

export default function NextBigYear({
  setQuestionPageNum,
  events,
  setEvents,
  numPeriods,
}: {
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  numPeriods: number;
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

  function prevButtonClicked() {
    events.length === 1 ? setQuestionPageNum(1) : setQuestionPageNum(4);
  }

  function nextButtonClicked(data: dataType) {
    setQuestionPageNum(3);
    /*
    The length of events is greater than numPeriod 
    if the current page has been reached from the next page (i.e. by clicking prev from the next page)
    */
    if (events.length === numPeriods) {
      setEvents((prev) => [
        ...prev,
        {
          nextYear: data.yearSelect,
          type: null,
          period: { value: NaN, description: "" },
          specificYear: [],
        },
      ]);
    } else if (events.length > numPeriods) {
      setEvents((prev) => [
        ...prev.slice(0, -1),
        {
          nextYear: data.yearSelect,
          type: null,
          period: { value: NaN, description: "" },
          specificYear: [],
        },
      ]);
    }
  }

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(nextButtonClicked)}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={prevButtonClicked}>
        Prev
      </button>
      <div className={styles.subContainer}>
        <label className={styles.label}>When was your next big event?</label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "auto",
          }}>
          <p style={{ marginTop: "auto", marginBottom: "auto" }}>{`${
            events.slice(-1)[0].nextYear
          } ~ `}</p>
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
      <input
        className={`${styles.button} ${styles.right}`}
        type="submit"
        value="Next"
      />
    </form>
  );
}
