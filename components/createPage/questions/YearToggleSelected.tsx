import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "../../../styles/createPage/form.module.css";
import { eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";
import Select from "../tools/YearSelect";

export default function YearToggleSelected({
  events,
  setEvents,
}: {
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      yearSelect: events.slice(-2)[0].nextYear,
      valueSlider: 0,
      description: "",
    },
  });

  //If it is the first period, then the period starts from birth year + 1
  const startYear =
    events.length > 2
      ? events.slice(-2)[0].nextYear
      : events.slice(-2)[0].nextYear + 1;

  useEffect(() => {
    setValue("yearSelect", startYear);
  }, [setValue, startYear]);

  function onSubmit(data: any) {
    setEvents((prev) => [
      ...prev.slice(0, -1),
      {
        ...prev.slice(-1)[0],
        type: "specificYear",
        specificYear: [
          ...prev.slice(-1)[0].specificYear,
          {
            year: data.yearSelect,
            value: data.valueSlider,
            description: data.description,
          },
        ],
      },
    ]);
    //reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.yearToggleQuestionContainer}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr auto",
          gridTemplateColumns: "1fr 2fr",
          rowGap: "1rem",
        }}>
        <label className={styles.questionText}>What year?</label>

        <Controller
          name="yearSelect"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              onChange={onChange}
              reverse={false}
              start={startYear}
              end={events.slice(-1)[0].nextYear - 1}
            />
          )}
        />
        {errors.yearSelect && (
          <p style={{ display: "inline", color: "red" }}>
            {errors.yearSelect.message as string}
          </p>
        )}

        <label className={styles.questionText}>Value</label>

        <Controller
          name="valueSlider"
          control={control}
          render={({ field: { onChange } }) => <Slider onChange={onChange} />}
        />
        {errors.valueSlider && (
          <p style={{ display: "inline", color: "red" }}>
            {errors.valueSlider.message as string}
          </p>
        )}

        <label>Description</label>

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange } }) => (
            <textarea onChange={onChange} rows={4} cols={25} />
          )}
        />
        {errors.description && (
          <p style={{ display: "inline", color: "red" }}>
            {errors.description.message as string}
          </p>
        )}
        <div style={{width: 'fit-content'}}>
          <input className={styles.button} type="submit" value="Add" />
        </div>
      </div>
    </form>
  );
}
