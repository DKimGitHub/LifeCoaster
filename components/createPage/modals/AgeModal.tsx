import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { dataType, eventType } from "../../../lib/types";
import styles from "../../../styles/createPage/modal.module.css";
import Select from "../tools/YearSelect";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function AgeModal({
  setModalPageNum,
  setQuestionPageNum,
  setEvents,
  setIsModalOpen,
}: {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({defaultValues: {
    "yearSelect": currentYear
  },});

  //Sets the default selector value
  useEffect(() => setValue("yearSelect", new Date().getFullYear()), [setValue]);

  /*
    Closes the modal and opens the question page.
  */
  function onSubmit(data: dataType) {
    setIsModalOpen(false);
    setTimeout(() => {
      setQuestionPageNum(1);
      setModalPageNum(NaN);
    }, 1000);
    updateEvents(data);
  }

  //Create a new event such that the nextYear is equal to the birth year.
  function updateEvents(input: dataType) {
    setEvents([
      {
        nextYear: input.yearSelect,
        type: "period",
        period: {
          value: 0,
          description: "Born",
        },
        specificYear: [],
      },
    ]);
  }

  return (
    <form
      className={`${styles.container} ${pangolin.className}`}
      onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.formLabel}>When were you born?</label>
      <Controller
        name="yearSelect"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              onChange={onChange}
              reverse={true}
              start={1900}
              end={currentYear}
              value={value}
            />
          );
        }}
      />
      {errors.yearSelect && (
        <p style={{ display: "inline", color: "red" }}>
          {errors.yearSelect.message as string}
        </p>
      )}
      <br />
      <input className={styles.button} type="submit" value="Start" />
    </form>
  );
}
