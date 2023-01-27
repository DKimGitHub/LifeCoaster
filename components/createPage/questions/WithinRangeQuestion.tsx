import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";

export default function WithinRangeQuestion() {
  const { setQuestionPageNum, setEvents} = useContext(CreatePageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function prevButtonClicked(){
    setEvents(prev => prev.slice(0, -1))
    setQuestionPageNum(2);
  }

  function onSubmit(data: dataType) {
    setQuestionPageNum(5);
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={prevButtonClicked}>
        Prev
      </button>
      <div className={styles.subContainer}>
        <label className={styles.label}>
          What is the overall satisfactory value within this range of years?
        </label>
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
