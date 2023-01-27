import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";

export default function FirstQuestion() {
  const {
    setQuestionPageNum,
    setIsModalOpen,
    setModalPageNum,
    setEvents,
  } = useContext(CreatePageContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function prevButtonClicked() {
    setQuestionPageNum(0);
    setIsModalOpen(true);
    setModalPageNum(3);
    setEvents([{bigEvent: 1900, overallValue: NaN, specificEvents: []}]);
  }

  function onSubmit(data: dataType) {
    console.log(data)
    setQuestionPageNum(2);
    // const options = {
    //   method: "POST",
    //   body: JSON.stringify({
    //     data: {
    //       graph: {
    //         connect: {
    //           id: graphId,
    //         },
    //       },
    //       title: "some title",
    //     },
    //   }),
    // };
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
          How content were you when you were born?
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
