import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { dataType, eventType } from "../../../lib/types";
import styles from "../../../styles/createPage/modal.module.css";
import Select from "../tools/YearSelect";

export default function AgeModal({
  setModalPageNum,
  setQuestionPageNum,
  setEvents,
  setNumPeriods,
}: {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  setNumPeriods: React.Dispatch<React.SetStateAction<number>>;
}) {
  /*
    Closes the modal and sets the nextYear and specificYear with the birth year.
  */
  function onSubmit(data: dataType) {
    setModalPageNum(NaN);
    setEvents([
      {
        nextYear: data.yearSelect,
        type: "specificYear",
        period: {
          value: NaN,
          description: "",
        },
        specificYear: [
          {
            year: data.yearSelect,
            value: NaN,
            description: "Born",
          },
        ],
      },
    ]);
    setNumPeriods(1);
    setQuestionPageNum(1);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  //Sets the default selector value
  useEffect(() => setValue("yearSelect", new Date().getFullYear()), [setValue]);
  const currentYear = new Date().getFullYear();

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.formLabel}>When were you born?</label>
      <Controller
        name="yearSelect"
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Select
              onChange={onChange}
              reverse={true}
              start={1900}
              end={currentYear}
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
      <input className={styles.button} type="submit" value="Next" />
    </form>
  );
}
