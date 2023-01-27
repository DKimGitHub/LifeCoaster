"use client";

import React, { useState, useEffect } from "react";

import Graph from "../../components/createPage/Graph";
import QuestionsMain from "../../components/createPage/questions/QuestionsMain";
import ModalsMain from "../../components/createPage/modals/ModalsMain";

import CreatePageContext from "../../lib/CreatePageContext";
import { dataType } from "../../lib/types";
import styles from "../../styles/createPage/create.module.css";

export default function Page() {
  const [userInput, setUserInput] = useState<dataType[]>([]);
  const [graphId, setGraphId] = useState<string>("");
  const [yearBorn, setYearBorn] = useState<number>(NaN);
  const [nextBigEvent, setNextBigEvent] = useState<number>(1900);
  const [prevBigEvent, setPrevBigEvent] = useState<number>(NaN);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [modalPageNum, setModalPageNum] = useState<number>(NaN);
  /* 
    #1: ContinueModal
    #2: IntroModal
    #3: AgeModal
  */
  const [questionPageNum, setQuestionPageNum] = useState<number>(NaN);
  /*
  #1: FirstQuestion
  #2: NextBigEvent
  #3: YearOverlay
  #4: WithinRangeQuestion
  #5: SpecificYearQuestion
  */

  useEffect(() => {
    const savedState = localStorage.getItem("savedPost");
    if (savedState && !Number.isNaN(JSON.parse(savedState).questionPageNum)) {
      setUserInput(JSON.parse(savedState).userInput);
      setGraphId(JSON.parse(savedState).graphId);
      setYearBorn(JSON.parse(savedState).yearBorn);
      setNextBigEvent(JSON.parse(savedState).nextBigEvent);
      setQuestionPageNum(JSON.parse(savedState).questionPageNum);
      setModalPageNum(1);
    } 
    else {
      setModalPageNum(2);
      createPost();
    }
  }, []);

  useEffect(() => {
    const savedState = {
      userInput: userInput,
      graphId: graphId,
      yearBorn: yearBorn,
      nextBigEvent: nextBigEvent,
      questionPageNum: questionPageNum,
    };
    localStorage.setItem("savedPost", JSON.stringify(savedState))
  }, [userInput, graphId, yearBorn, nextBigEvent, questionPageNum]);

  async function createPost() {
    // const options = {
    //   method: "POST",
    //   body: JSON.stringify({
    //     data: {
    //       graph: {
    //         create: { isYear: false },
    //       },
    //     },
    //     include: {
    //       graph: {
    //         select: {
    //           id: true,
    //         },
    //       },
    //     },
    //   }),
    // };
    // const response = await fetch("/api/post", options);
    // const data = await response.json();
    // setGraphId(data.graph.id);
  }

  function reset() {
    localStorage.removeItem("savedPost");
    setUserInput([]);
    setNextBigEvent(1900);
    setGraphId("");
    setModalPageNum(2);
    setQuestionPageNum(0);
    setYearBorn(NaN);
    setIsModalOpen(true);
    createPost();
  }

  const contextProps = {
    userInput,
    setUserInput,
    graphId,
    yearBorn,
    setYearBorn,
    nextBigEvent,
    setNextBigEvent,
    prevBigEvent,
    setPrevBigEvent,
    modalPageNum,
    setModalPageNum,
    isModalOpen,
    setIsModalOpen,
    questionPageNum,
    setQuestionPageNum,
    reset,
  };

  return (
    <CreatePageContext {...contextProps}>
      <ModalsMain />
      <div className="flex flex-col items-center">
        <div className="mt-10 h-60 w-full text-center">
          <Graph />
        </div>
        <div className={styles.resetContainer}>
          <button className={styles.resetButton} onClick={reset}>
            start from scratch
          </button>
        </div>
        <QuestionsMain />
      </div>
    </CreatePageContext>
  );
}
