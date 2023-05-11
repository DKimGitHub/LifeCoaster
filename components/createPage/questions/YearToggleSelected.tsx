import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "../../../styles/createPage/form.module.css";
import { eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";
import Select from "../tools/YearSelect";

export default function YearToggleSelected({
  events,
  setEvents,
  defaultValues,
  setDefaultValues,
  specificYearId,
  eventId,
}: {
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  defaultValues: number[];
  setDefaultValues: React.Dispatch<React.SetStateAction<number[]>>;
  specificYearId: String;
  eventId: String;
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
      yearSelect: defaultValues[1],
      valueSlider: defaultValues[2],
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

  function onSubmit() {
    setEvents((prev) => [
      ...prev.slice(0, -1),
      {
        ...prev.slice(-1)[0],
        specificYear: [
          ...prev.slice(-1)[0].specificYear,
          {
            year: NaN,
            value: 0,
            description: "",
          },
        ],
      },
    ]);
    setDefaultValues((prev) => [prev[0], prev[1], 0]);
    updateDBAdd();
  }

  function updateEventsYear(value: number) {
    setEvents((prev) => [
      ...prev.slice(0, -1),
      {
        ...prev.slice(-1)[0],
        type: "specificYear",
        specificYear: [
          ...prev.slice(-1)[0].specificYear.slice(0, -1),
          {
            ...prev.slice(-1)[0].specificYear.slice(-1)[0],
            year: value,
          },
        ],
      },
    ]);
    setDefaultValues((prev) => [prev[0], value, prev[2]]);
    updateDBEventsYear(value);
  }

  function updateEventsValue(value: number) {
    setEvents((prev) => [
      ...prev.slice(0, -1),
      {
        ...prev.slice(-1)[0],
        type: "specificYear",
        specificYear: [
          ...prev.slice(-1)[0].specificYear.slice(0, -1),
          {
            ...prev.slice(-1)[0].specificYear.slice(-1)[0],
            value: value,
          },
        ],
      },
    ]);
    setDefaultValues((prev) => [prev[0], prev[1], value]);
    updateDBEventsValue(value);
  }

  async function updateDBEventsYear(value: number) {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: specificYearId,
        },
        data: {
          year: value,
        },
      }),
    };
    const response = await fetch("/api/post/graph/event/specificYear", options);
    const data = await response.json();
  }

  async function updateDBEventsValue(value: number) {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: specificYearId,
        },
        data: {
          value: value,
        },
      }),
    };
    const response = await fetch("/api/post/graph/event/specificYear", options);
    const data = await response.json();
  }

  async function updateDBAdd() {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: eventId,
        },
        data: {
          specificYear: {
            create: {
              year: NaN,
              value: 0,
              description: "",
            },
          },
        },
        include: {
          specificYear: true
        }
      }),
    };
    const response = await fetch("/api/post/graph/event/", options);
    const data = await response.json();
    console.log(data);
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
          render={() => (
            <Select
              onChange={updateEventsYear}
              reverse={false}
              start={startYear}
              end={events.slice(-1)[0].nextYear - 1}
              defaultValue={defaultValues[1]}
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
          render={() => (
            <Slider
              onChange={updateEventsValue}
              defaultValue={defaultValues[2]}
            />
          )}
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
        <div style={{ width: "fit-content" }}>
          <input className={styles.button} type="submit" value="Add" />
        </div>
      </div>
    </form>
  );
}
