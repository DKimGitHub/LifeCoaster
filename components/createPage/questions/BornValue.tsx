import React from "react";
import { useForm, Controller } from "react-hook-form";

import ToolBar from "./ToolBar";
import styles from "../../../styles/createPage/form.module.css";
import { eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";
import PageTransition from "../../PageTransition";

export default function BornValue({
  questionPageNum,
  setQuestionPageNum,
  setModalPageNum,
  setIsModalOpen,
  events,
  setEvents,
  reset,
  setEventId,
  setIsCompleteModalOpen,
  setGraphId,
  setPostId,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  setEventId: React.Dispatch<React.SetStateAction<String>>;
  setIsCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphId: React.Dispatch<React.SetStateAction<String>>;
  setPostId: React.Dispatch<React.SetStateAction<String>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
      defaultValues: {
        "valueSlider": 0
      },
    }
  );

  const currentYear = events.slice(-1)[0].nextYear;

  async function handlePrevButton() {
    setQuestionPageNum(NaN);
    setModalPageNum(3);
    setEvents([]);
    setEventId("");
    setIsModalOpen(true);
  }

  function handleNextButton() {
    setQuestionPageNum(2);
  }

  function updateOnValueChange(value: number) {
    updateEventsBornValue(value);
  }

  //Creates a new event 
  function createNewEvent() {
    setEvents((prev) => {
      return [
        ...prev,
        {
          nextYear: currentYear + 1,
          type: null,
          period: { value: 0, description: "" },
          specificYear: [],
        },
      ];
    });
  }

  //update the next year on the first event, which is the only event present currently.
  function updateEventsBornValue(value: number) {
    setEvents((prev) => [
      {
        ...prev[0],
        period: { ...prev[0].period, value: value },
      },
    ]);
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
            events,
            setEvents,
            setGraphId,
            setPostId,
            setIsCompleteModalOpen,
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
              render={({ field: { onChange, value } }) => {
                function customOnChange(value: number){
                  onChange(value);
                  updateOnValueChange(value);
                }
                return (
                  <Slider onChange={customOnChange} value={value} />
                )
              }}
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
