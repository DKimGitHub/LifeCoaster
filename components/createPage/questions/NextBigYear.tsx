import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ToolBar from "./ToolBar";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, eventType } from "../../../lib/types";
import Select from "../tools/YearSelect";
import PageTransition from "../../PageTransition";

export default function NextBigYear({
  questionPageNum,
  setQuestionPageNum,
  events,
  setEvents,
  reset,
  setIsCompleteModalOpen,
  setGraphId,
  setPostId,
  graphId,
  postId,
  name,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  specificYearId: String;
  setIsCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphId: React.Dispatch<React.SetStateAction<String>>;
  setPostId: React.Dispatch<React.SetStateAction<String>>;
  graphId: String;
  name: String;
  postId: String;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      "yearSelect": events.slice(-1)[0].nextYear + 1,
    },
  });

  /*
  If the current period is the period right after the birth year, 
  the period starts from birth year + 1. Otherwise, the period starts from the previous year.
  */
  useEffect(() => {
    setValue("yearSelect", events.slice(-1)[0].nextYear + 1);
  }, [setValue, events]);

  const [currentSelectedInput, setCurrentSelectedInput] = useState<number>(
    events.slice(-1)[0].nextYear + 1
  );

  function handlePrevButton() {
    events.length === 1 ? setQuestionPageNum(1) : setQuestionPageNum(4);
  }

  function handleNextButton(data: dataType) {
    setQuestionPageNum(3);
    createNewEvent(data.yearSelect);
  }

  function createNewEvent(value: number) {
    setEvents((prev) => {
      return [
        ...prev,
        {
          nextYear: value,
          type: null,
          period: { value: 0, description: "" },
          specificYear: [{
            year: value + 1,
            value: 0,
            description: "",
          },],
        },
      ];
    });
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
            graphId,
            postId,
            name,
            setIsCompleteModalOpen,
          }}
        />
      </div>
      <PageTransition>
        <div className={styles.question}>
          <label className={styles.questionText}>
            When was the year in which your next big event had occurred?
          </label>
          <div
            style={{
              height: "fit-content",
              display: "flex",
              flexDirection: "row",
            }}>
            <Controller
              name="yearSelect"
              control={control}
              render={({ field: { onChange, value } }) => {

                function customOnChange(value: number) {
                  onChange(value);
                  setCurrentSelectedInput(value);
                }
                return (
                  <Select
                    reverse={false}
                    onChange={customOnChange}
                    start={events.slice(-1)[0].nextYear + 1}
                    end={new Date().getFullYear()}
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
          </div>
          <label className={styles.questionText}>
            You will be rating:{" "}
            {(() => {
              if (currentSelectedInput !== undefined) {
                if (events.slice(-1)[0].nextYear === currentSelectedInput - 1) {
                  return `${events.slice(-1)[0].nextYear}`;
                } else {
                  return `${events.slice(-1)[0].nextYear} ~ ${currentSelectedInput - 1
                    }`;
                }
              } else {
                return `${events.slice(-1)[0].nextYear}`;
              }
            })()}
          </label>
        </div>
      </PageTransition>
    </form>
  );
}
