import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { dataType } from "../../../lib/types";
import { CreatePageContext } from "../../../lib/CreatePageContext";

import FirstQuestion from "./FirstQuestion";
import NextBigEvent from "./NextBigEvent";
import YearOverlay from "./YearOverlay";
import WithinRangeQuestion from "./WithinRangeQuestion";
import SpecificYearQuestion from "./SpecificYearQuestion";

async function fetchData(api: string, options: dataType) {
  const response = await fetch(api, options);
  const data = await response.json();
  return data;
}

export default function QuestionsMain() {
  const { questionPageNum, setQuestionPageNum } = useContext(CreatePageContext);

  const [prevBigEvent, setPrevBigEvent] = useState<number>(NaN);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  switch (questionPageNum) {
    case 1:
      return <FirstQuestion />;
      break;
    case 2:
      return (
        <NextBigEvent />
      );
      break;
    case 3:
      return (
        <YearOverlay />
      );
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
