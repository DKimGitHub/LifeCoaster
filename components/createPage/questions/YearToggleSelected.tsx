import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "../../../styles/createPage/form.module.css";
import { eventType, dataType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";
import Select from "../tools/YearSelect";
import PageTransition from "../../PageTransition";
import AddedOverlay from "../../AddedOverlay";

export default function YearToggleSelected({
  events,
  setEvents,
  defaultValues,
  setDefaultValues,
  specificYearId,
  eventId,
  range,
  setRange,
}: {
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  defaultValues: number[];
  setDefaultValues: React.Dispatch<React.SetStateAction<number[]>>;
  specificYearId: String;
  eventId: String;
  range: number[];
  setRange: React.Dispatch<React.SetStateAction<number[]>>;
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
      "yearSelect": defaultValues[1],
      "valueSlider": defaultValues[2],
      "description": "",
    },
  });

  //If it is the first period, then the period starts from birth year + 1
  const [startYear, setStartYear] = useState<number>(events.length > 2
    ? events.slice(-2)[0].nextYear
    : events.slice(-2)[0].nextYear + 1)
  const [isAddedVisible, setIsAddedVisible] = useState<boolean>(false);

  function onSubmit(data: dataType) {
    if (!Number.isNaN(events.slice(-1)[0].specificYear.slice(-1)[0].year)) {
      const yearInput = events.slice(-1)[0].specificYear.slice(-1)[0].year;
      setEvents((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev.slice(-1)[0],
          specificYear: [
            ...prev.slice(-1)[0].specificYear.slice(0, -1),
            {
              ...prev.slice(-1)[0].specificYear.slice(-1)[0],
              description: data.description,
            },
            {
              year: NaN,
              value: 0,
              description: "",
            },
          ],
        },
      ]);
      setRange(range.filter((i) => i !== yearInput));
      // updateDBAdd();
      setValue("valueSlider", 0);
      setDefaultValues((prev) => [prev[0], NaN, 0]);
      setIsAddedVisible(true);
      setTimeout(() => {
        setIsAddedVisible(false);
      }, 1000);
    }
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
    // updateDBEventsYear(value);
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
    // updateDBEventsValue(value);
  }

  // async function updateDBEventsYear(value: number) {
  //   const options: any = {
  //     method: "PUT",
  //     body: JSON.stringify({d
  //       where: {
  //         id: specificYearId,
  //       },
  //       data: {
  //         year: value,
  //       },
  //     }),
  //   };
  //   const response = await fetch("/api/post/graph/event/specificYear", options);
  //   const data = await response.json();
  // }

  // async function updateDBEventsValue(value: number) {
  //   const options: any = {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       where: {
  //         id: specificYearId,
  //       },
  //       data: {
  //         value: value,
  //       },
  //     }),
  //   };
  //   const response = await fetch("/api/post/graph/event/specificYear", options);
  //   const data = await response.json();
  // }

  // async function updateDBAdd() {
  //   const options: any = {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       where: {
  //         id: eventId,
  //       },
  //       data: {
  //         specificYear: {
  //           create: {
  //             year: NaN,
  //             value: 0,
  //             description: "",
  //           },
  //         },
  //       },
  //       include: {
  //         specificYear: true,
  //       },
  //     }),
  //   };
  //   const response = await fetch("/api/post/graph/event/", options);
  //   const data = await response.json();
  // }

  return (
    <PageTransition>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.yearToggleQuestionContainer}>
        <label className={styles.questionText}>What year?</label>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Controller
            name="yearSelect"
            control={control}
            render={({ field: { onChange, value } }) => {
              function customOnChange(value: number) {
                onChange(value);
                updateEventsYear(value);
              }
              return (
                <Select
                  onChange={customOnChange}
                  rangeInput={range}
                  value={value}
                />
              )
            }}
          />
          {errors.yearSelect && (
            <p style={{ display: "inline", color: "red" }}>
              {errors.yearSelect.message as string}
            </p>
          )}
        </div>

        <label className={styles.questionText}>Value</label>

        <Controller
          name="valueSlider"
          control={control}
          render={({ field: { onChange, value } }) => {
            function customOnChange(value: number) {
              onChange(value);
              updateEventsValue(value);
            }
            return (
              <Slider
                onChange={customOnChange}
                value={value}
              />
            )
          }}
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
          render={({ field: { onChange, value } }) => (
            <textarea
              style={{
                overflowY: "scroll",
                background: "#faf6ed",
                border: "2px solid #9c9587",
                borderRadius: "0.5rem",
              }}
              onChange={onChange}
              rows={2}
              cols={15}
            />
          )}
        />
        {errors.description && (
          <p style={{ display: "inline", color: "red" }}>
            {errors.description.message as string}
          </p>
        )}
        <div className={styles.addButton}>
          <input className={styles.button} type="submit" value="Add" />
        </div>
      </form>
      {isAddedVisible && <AddedOverlay />}
    </PageTransition>
  );
}
