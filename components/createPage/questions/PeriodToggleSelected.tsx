import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";
import PageTransition from "../../PageTransition";
import styles from "../../../styles/createPage/form.module.css";


export default function PeriodToggleSelected({
  setEvents,
  defaultValues,
  setDefaultValues,
}: {
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  defaultValues: number[];
  setDefaultValues: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      "valueSlider": defaultValues[0],
    },
  });

  const [isSetPeriod, setIsSetPeriod] = useState<boolean>(false);

  if (!isSetPeriod) {
    setEvents((prev) => [
      ...prev.slice(0, -1),
      {
        ...prev.slice(-1)[0],
        type: "period",
      },
    ]);
    setIsSetPeriod(true);
  }

  function updateValueChange(value: number) {
    updateEventsValue(value);
  }

  function updateEventsValue(value: number) {
    setEvents((prev) => [
      ...prev.slice(0, -1),
      {
        ...prev.slice(-1)[0],
        type: "period",
        period: {
          ...prev.slice(-1)[0].period,
          value: value,
        },
      },
    ]);
    setDefaultValues((prev) => [value, prev[1], prev[2]]);
  }

  return (
    <PageTransition>
      <div className={styles.question}>
        <label className={styles.questionText}>
          What is the average satisfactory level within this period?
        </label>
        <div className={styles.questionTool}>
          <Controller
            name="valueSlider"
            control={control}
            render={({ field: { value, onChange } }) => {
              function customOnChange(value: number){
                onChange(value);
                updateValueChange(value);
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
        </div>
      </div>
    </PageTransition>
  );
}
