import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import ToolBar from "./ToolBar";
import styles from "../../../styles/createPage/form.module.css";
import { eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";
import PageTransition from "../../PageTransition";

export default function PeriodToggleSelected({
  setEvents,
  defaultValues,
  setDefaultValues,
  eventId,
}: {
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  defaultValues: number[];
  setDefaultValues: React.Dispatch<React.SetStateAction<number[]>>;
  eventId: String;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      valueSlider: defaultValues[0],
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
    updateDBPeriod();
  }

  function updateValueChange(value: number) {
    updateEventsValue(value);
    updateDBAdd(value);
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

  async function updateDBPeriod() {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: eventId,
        },
        data: {
          type: "period",
        },
      }),
    };
    const response = await fetch("/api/post/graph/event/", options);
    const data = await response.json();
  }

  async function updateDBAdd(value: number) {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: eventId,
        },
        data: {
          period: {
            update: {
              value: value,
            },
          },
        },
      }),
    };
    const response = await fetch("/api/post/graph/event/", options);
    const data = await response.json();
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
            render={() => (
              <Slider
                onChange={updateValueChange}
                defaultValue={defaultValues[0]}
              />
            )}
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
