import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import { dataType } from "../../../lib/types";
import styles from "../../../styles/createPage/modal.module.css";
import Select from "../tools/YearSelect";

export default function AgeModal() {
  const {
    setModalPageNum,
    setIsModalOpen,
    setQuestionPageNum,
    setEvents,
    events,
  } = useContext(CreatePageContext);

  function onSubmit(data: dataType) {
    setModalPageNum(0);
    setIsModalOpen(false);
    setEvents([
      { bigEvent: data.yearSelect, overallValue: NaN, specificEvents: [] },
    ]);
    setQuestionPageNum(1);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("yearSelect", 2023);
  }, [setValue]);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.formLabel}>When were you born?</label>
      <Controller
        name="yearSelect"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              onChange={onChange}
              reverse={true}
              start={events.slice(-1)[0].bigEvent + 1}
              end={new Date().getFullYear()}
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
