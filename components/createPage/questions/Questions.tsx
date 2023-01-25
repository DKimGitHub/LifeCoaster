import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, FormState } from "../../../lib/types";
import FirstQuestion from "./FirstQuestion";
import NextBigEvent from "./NextBigEvent";
import YearOverlay from "../tools/YearOverlay";

async function fetchData(api: string, options: dataType) {
  const response = await fetch(api, options);
  const data = await response.json();
  return data;
}

export default function CreateForm() {
  const { userInput, updateUserInput, graphId, yearBorn } =
    useContext(CreatePageContext);
  const [isFirstQuestion, setIsFirstQuestion] = useState<boolean>(true);
  const [isNextBigEvent, setIsNextBigEvent] = useState<boolean>(false);
  const [isYearOverlay, setIsYearOverlay] = useState<boolean>(false);
  const [prevBigEvent, setPrevBigEvent] = useState<number>(NaN);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isFirstQuestion) {
    return (
      <FirstQuestion
        setIsFirstQuestion={setIsFirstQuestion}
        setIsNextBigEvent={setIsNextBigEvent}
      />
    );
  }
  if (isNextBigEvent) {
    return (
      <NextBigEvent
        setIsNextBigEvent={setIsNextBigEvent}
        setIsYearOverlay={setIsYearOverlay}
        setPrevBigEvent={setPrevBigEvent}
      />
    );
  }
  if (isYearOverlay) {
    return <YearOverlay prevBigEvent={prevBigEvent} />;
  } else {
    return <p>Page Not Found!</p>;
  }
}
