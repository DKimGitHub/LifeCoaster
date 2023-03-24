import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import ToolBar from "./ToolBar";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";

export default function BornValue({
  questionPageNum,
  setQuestionPageNum,
  setModalPageNum,
  setEvents,
  reset,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
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
  function handlePrevButton() {
    setQuestionPageNum(NaN);
    setModalPageNum(3);
    setEvents([]);
  }

  function handleNextButton(data: dataType) {
    console.log("BUG")
    setQuestionPageNum(2);
    //Update the specificYear array
    setEvents((prev) => [
      {
        ...prev[0],
        specificYear: [{ ...prev[0].specificYear[0], value: data.valueSlider }],
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
    <form className={styles.questionContainer}>
      <div className={styles.toolContainer}>
        <ToolBar
          {...{
            handlePrevButton,
            handleNextButton,
            questionPageNum,
            handleSubmit,
            reset,
          }}
        />
      </div>
      <div className={styles.question}>
        <label className={styles.questionText}>
          How content were you when you were born?
        </label>
        <div className={styles.questionTool}>
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
    </form>
  );
}
