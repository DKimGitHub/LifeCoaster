import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { dataType, eventType } from "../../../lib/types";
import { CreatePageContext } from "../../../lib/CreatePageContext";

import BornValue from "./BornValue";
import NextBigYear from "./NextBigYear";
import YearOverlay from "./YearOverlay";
import WithinRangeQuestion from "./ValueQuestions";
import SpecificYearQuestion from "./SpecificYearQuestion";

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
}: {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  numPeriods: number;
  setNumPeriods: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  switch (questionPageNum) {
    case 1:
      return (
        <BornValue
          {...{
            setQuestionPageNum,
            setModalPageNum,
            events,
            setEvents,
          }}
        />
      );
      break;
    case 2:
      return (
        <NextBigYear
          {...{
            setQuestionPageNum,
            events,
            setEvents,
            numPeriods,
            setNumPeriods,
          }}
        />
      );
      break;
    case 3:
      return <YearOverlay {...{ events, setQuestionPageNum }} />;
      break;
    case 4:
      return <WithinRangeQuestion />;
      break;
    case 5:
      return <SpecificYearQuestion />;
      break;
    default:
      return <p></p>;
  }
}
