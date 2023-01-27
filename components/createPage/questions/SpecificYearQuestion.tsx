import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import { dataType } from "../../../lib/types";

import Slider from "../tools/ValueSlider";
import Select from "../tools/YearSelect";

import styles from "../../../styles/createPage/form.module.css";

export default function SpecificYearQuestion() {
  const { setUserInput, setQuestionPageNum } = useContext(CreatePageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function prevButtonClicked(){
    setQuestionPageNum(4);
  }

  function onSubmit(data: dataType) {
    // updateUserInput((prev) => [
    //   ...prev,
    //   { xValue: yearBorn, yValue: data.valueSlider },
    // ]);
    setQuestionPageNum(2);
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={prevButtonClicked}>
        Prev
      </button>
      <div className={styles.subContainer}>
        <label className={styles.label}>Specific year?</label>
        <Controller
          name="yearSelect"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select onChange={onChange} reverse={false} />
          )}
        />
        {errors.yearSelect && (
          <p style={{ display: "inline", color: "red" }}>
            {errors.yearSelect.message as string}
          </p>
        )}
      </div>
      <div className={styles.subContainer}>
        <label className={styles.label}>Satisfactory level?</label>
        <Controller
          name="valueSlider"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Slider onChange={onChange} />
          )}
        />
        {errors.valueSlider && (
          <p style={{ display: "inline", color: "red" }}>
            {errors.valueSlider.message as string}
          </p>
        )}
      </div>
      <input
        className={`${styles.button} ${styles.right}`}
        type="submit"
        value="Next"
      />
    </form>
  );
}
