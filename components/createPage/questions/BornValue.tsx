import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import ToolBar from "./ToolBar";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";
import PageTransition from "../../PageTransition";

export default function BornValue({
  questionPageNum,
  setQuestionPageNum,
  setModalPageNum,
  setEvents,
  reset,
  specificYearId,
  eventId,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  specificYearId: String;
  eventId: String;
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
    setQuestionPageNum(2);
    //Update the specificYear array
    setEvents((prev) => [
      {
        ...prev[0],
        specificYear: [{ ...prev[0].specificYear[0], value: data.valueSlider }],
      },
    ]);
    updateDBAdd(data);
  }

  async function updateDBAdd(input: dataType) {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: specificYearId,
        },
        data: {
          value: input.valueSlider,
        },
      }),
    };
    const response = await fetch("/api/post/graph/event/specificYear", options);
    const data = await response.json();
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
            setEvents,
            eventId,
          }}
        />
      </div>
      <PageTransition>
        <div className={styles.question}>
          <label className={styles.questionText}>
            How content were you when you were born?
          </label>
          <div className={styles.questionTool}>
            <Controller
              name="valueSlider"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Slider onChange={onChange} defaultValue={0} />
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
    </form>
  );
}
