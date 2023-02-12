"use client";

import React, { useState, useEffect } from "react";

import Graph from "../../components/createPage/Graph";
import QuestionsMain from "../../components/createPage/questions/QuestionsMain";
import ModalsMain from "../../components/createPage/modals/ModalsMain";

import CreatePageContext from "../../lib/CreatePageContext";
import { eventType, nodeType} from "../../lib/types";
import styles from "../../styles/createPage/create.module.css";

export default function Page() {
  const [graphId, setGraphId] = useState<string>("");
  const [events, setEvents] = useState<eventType>([{bigEvent: 1900, overallValue: NaN, specificEvents: []}]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [nodes, setNodes] = useState<nodeType>([]);
  const [phantomNodes, setPhantomNodes] = useState<nodeType>([]);
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
    console.log(events);
    console.log(nodes);
    console.log(phantomNodes)
  },[events, nodes, phantomNodes])

  useEffect(() => {
    const savedState = localStorage.getItem("savedPost");
    if (savedState && !Number.isNaN(JSON.parse(savedState).questionPageNum)) {
      setGraphId(JSON.parse(savedState).graphId);
      setEvents(JSON.parse(savedState).events);
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
      graphId: graphId,
      events: events,
      questionPageNum: questionPageNum,
    };
    localStorage.setItem("savedPost", JSON.stringify(savedState))
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
    setEvents([{bigEvent: 1900, overallValue: NaN, specificEvents: []}]);
    setNodes([]);
    setPhantomNodes([]);
    setGraphId("");
    setModalPageNum(2);
    setQuestionPageNum(0);
    setIsModalOpen(true);
    createPost();
  }

  const contextProps = {
    graphId,
    events,
    setEvents,
    nodes,
    setNodes,
    phantomNodes,
    setPhantomNodes,
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
