import React from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "../../../styles/createPage/form.module.css";
import { eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";

export default function PeriodToggleSelected({
  setEvents,
}: {
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
}) {
  const {
    register, 
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      valueSlider: 0,
    },
  });

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
  }

  return (
    <form className={styles.subContainer}>
      <h1 className={styles.label}>
        What is the average satisfactory level within this period?
      </h1>
      <div style={{ width: "50%" }}>
        <Controller
          name="valueSlider"
          control={control}
          render={() => <Slider onChange={updateEventsValue} />}
        />
        {errors.valueSlider && (
          <p style={{ display: "inline", color: "red" }}>
            {errors.valueSlider.message as string}
          </p>
        )}
      </div>
    </form>
  );
}
