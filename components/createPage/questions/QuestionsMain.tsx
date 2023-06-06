import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { dataType, eventType } from "../../../lib/types";

import BornValue from "./BornValue";
import NextBigYear from "./NextBigYear";
import YearOverlay from "./YearOverlay";
import ValueQuestions from "./ValueQuestions";
import styles from "../../../styles/createPage/form.module.css";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// async function fetchData(api: string, options: dataType) {
//   const response = await fetch(api, options);
//   const data = await response.json();
//   return data;
// }

export default function QuestionsMain({
  setModalPageNum,
  questionPageNum,
  setQuestionPageNum,
  events,
  setEvents,
  setIsModalOpen,
  reset,
  graphId,
  eventId, 
  specificYearId,
  setEventId,
  setSpecificYearId,
  setIsCompleteModalOpen,
  
}: {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  graphId: String;
  eventId: String;
  specificYearId: String;
  setEventId: React.Dispatch<React.SetStateAction<String>>;
  setSpecificYearId: React.Dispatch<React.SetStateAction<String>>;
  setIsCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
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
            events,
            setEvents,
            setIsModalOpen,
            reset,
            specificYearId,
            eventId,
            graphId,
            setEventId,
            setSpecificYearId,
            setIsCompleteModalOpen,
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
            reset,
            graphId,
            specificYearId,
            setEventId,
            setSpecificYearId,
            eventId,
            setIsCompleteModalOpen,
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
            eventId,
            graphId,
            specificYearId,
            setIsCompleteModalOpen
          }}
        />
      );
      break;
    default:
      page = <p></p>;
  }

  return (
    <div className={`${styles.container} ${pangolin.className}`}>
      {page}
    </div>
  );
}
