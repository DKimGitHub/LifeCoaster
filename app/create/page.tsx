"use client";

import React, { useState, useEffect } from "react";

import Graph from "../../components/createPage/Graph";
import QuestionsMain from "../../components/createPage/questions/QuestionsMain";
import ModalsMain from "../../components/createPage/modals/ModalsMain";

import { eventType, nodeType } from "../../lib/types";
import styles from "../../styles/createPage/create.module.css";

export default function Page() {
  const [graphId, setGraphId] = useState<string>("");
  const [events, setEvents] = useState<eventType>([]);
  const [numPeriods, setNumPeriods] = useState<number>(0);
  const [modalPageNum, setModalPageNum] = useState<number>(NaN);
  /* 
    #1: ContinueModal
    #2: IntroModal
    #3: AgeModal
  */
  const [questionPageNum, setQuestionPageNum] = useState<number>(NaN);
  /*
  #1: BornValue
  #2: NextBigYear
  #3: YearOverlay
  #4: ValueQuestions 
  */

  //Initialization when the Create page mounts
  useEffect(() => {
    const savedState = localStorage.getItem("savedPost");
    if (savedState && !Number.isNaN(JSON.parse(savedState).questionPageNum)) {
      setGraphId(JSON.parse(savedState).graphId);
      setEvents(JSON.parse(savedState).events);
      setQuestionPageNum(JSON.parse(savedState).questionPageNum);
      setModalPageNum(1);
    } else {
      setModalPageNum(2);
      createPost();
    }
    //clean up function
    return () => {
      setGraphId("");
      setEvents([]);
      setQuestionPageNum(NaN);
      setModalPageNum(NaN);
    };
  }, []);

  //Update the local cache whenever these dependcies change.
  useEffect(() => {
    const savedState = {
      graphId: graphId,
      events: events,
      questionPageNum: questionPageNum,
    };
    localStorage.setItem("savedPost", JSON.stringify(savedState));
  }, [graphId, events, questionPageNum]);

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
    setEvents([]);
    setNumPeriods(0);
    setGraphId("");
    setModalPageNum(2);
    setQuestionPageNum(NaN);
    createPost();
  }

  // const contextProps = {
  //   graphId,
  //   events,
  //   setEvents,
  //   modalPageNum,
  //   setModalPageNum,
  //   isModalOpen,
  //   setIsModalOpen,
  //   questionPageNum,
  //   setQuestionPageNum,
  //   reset,
  // };

  return (
    // <CreatePageContext {...contextProps}>
    <div className={styles.container}>
      <ModalsMain
        {...{
          modalPageNum,
          setModalPageNum,
          setQuestionPageNum,
          setEvents,
          setNumPeriods,
          reset,
        }}
      />
      <div className={styles.graphContainer}>
        <Graph {...{events}}/>
      </div>
      <div className={styles.toolsContainer}>
        <button className={styles.resetButton} onClick={reset}>
          start from scratch
        </button>
      </div>
      <div className={styles.questionsContainer}>
        <QuestionsMain
          {...{
            setModalPageNum,
            questionPageNum,
            setQuestionPageNum,
            events,
            setEvents,
            numPeriods,
            setNumPeriods,
          }}
        />
      </div>
    </div>
    // </CreatePageContext>
  );
}
