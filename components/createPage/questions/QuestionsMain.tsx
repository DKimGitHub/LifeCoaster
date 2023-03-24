import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { dataType, eventType } from "../../../lib/types";

import BornValue from "./BornValue";
import NextBigYear from "./NextBigYear";
import YearOverlay from "./YearOverlay";
import ValueQuestions from "./ValueQuestions";

import styles from "../../../styles/createPage/form.module.css";

async function fetchData(api: string, options: dataType) {
  const response = await fetch(api, options);
  const data = await response.json();
  return data;
}

export default function QuestionsMain({
  setModalPageNum,
  questionPageNum,
  setQuestionPageNum,
  events,
  setEvents,
  numPeriods,
  setNumPeriods,
  reset,
}: {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  numPeriods: number;
  setNumPeriods: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void; 
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var page = <></>;

  switch (questionPageNum) {
    case 1:
      page = (
        <BornValue
          {...{
            questionPageNum,
            setQuestionPageNum,
            setModalPageNum,
            setEvents,
            reset,
          }}
        />
      );
      break;
    case 2:
      page = (
        <NextBigYear
          {...{
            questionPageNum,
            setQuestionPageNum,
            events,
            setEvents,
            setNumPeriods,
            reset,
          }}
        />
      );
      break;
    case 3:
      page = <YearOverlay {...{ events, setQuestionPageNum }} />;
      break;
    case 4:
      page = (
        <ValueQuestions
          {...{
            questionPageNum,
            setQuestionPageNum,
            events,
            setEvents,
            reset,
          }}
        />
      );
      break;
    default:
      page = <p></p>;
  }

  return (
    <div className={styles.container}>
      {page}
    </div>
  );
}
