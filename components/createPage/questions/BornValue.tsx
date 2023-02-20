import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";

export default function BornValue({
  setQuestionPageNum,
  setModalPageNum,
  setEvents,
}: {
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  //Sets the default slider value
  useEffect(() => setValue("valueSlider", 0), [setValue]);

  /*
    Go back to the age modal.
    Year of birth is removed from the event array. 
  */
  function prevButtonClicked() {
    setQuestionPageNum(NaN);
    setModalPageNum(3);
    setEvents([]);
  }

  function nextButtonClicked(data: dataType) {
    setQuestionPageNum(2);
    //Update the specificYear array
    setEvents((prev) => [
      {
        ...prev[0],
        ...(prev[0].specificYear && {
          specificYear: [
            { ...prev[0].specificYear[0], value: data.valueSlider },
          ],
        }),
      },
    ]);
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
    <form
      className={styles.container}
      onSubmit={handleSubmit(nextButtonClicked)}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={prevButtonClicked}>
        Prev
      </button>
      <div className={styles.subContainer}>
        <label className={styles.label}>
          How content were you when you were born?
        </label>
        <div style={{ width: "50%" }}>
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
      </div>
      <input
        className={`${styles.button} ${styles.right}`}
        type="submit"
        value="Next"
      />
    </form>
  );
}
