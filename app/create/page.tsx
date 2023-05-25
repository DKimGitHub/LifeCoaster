"use client";

import React, { useState, useEffect } from "react";

import Graph from "../../components/createPage/Graph";
import QuestionsMain from "../../components/createPage/questions/QuestionsMain";
import ModalsMain from "../../components/createPage/modals/ModalsMain";
import nodes from "../../lib/importDataCreateNode";

import { eventType, nodeType } from "../../lib/types";
import styles from "../../styles/createPage/create.module.css";
import Navigation from "../../components/Navigation";
import AuthButtonHeader from "../../components/AuthButtonHeader";
import CreatePageAuthModal from "../../components/CreatePageAuthModal";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  const [postId, setPostId] = useState<String>("");
  const [graphId, setGraphId] = useState<String>("");
  const [eventId, setEventId] = useState<String>("");
  const [specificYearId, setSpecificYearId] = useState<String>("");
  const [events, setEvents] = useState<eventType>([]);
  const [modalPageNum, setModalPageNum] = useState<number>(NaN);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

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

  useEffect(() => {
    postId ? nodes(postId) : null;
  });

  useEffect(() => {
    if (!session) {
      setIsModalOpen(true);
    } else if (session && isFirstTime) {
      setIsFirstTime(false);
      setIsModalOpen(false);
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
    }
  }, [session]);

  //Initialization when the Create page mounts
  useEffect(() => {
    // const savedState = localStorage.getItem("savedPost");
    // if (savedState && !Number.isNaN(JSON.parse(savedState).questionPageNum)) {
    //   setGraphId(JSON.parse(savedState).graphId);
    //   setEvents(JSON.parse(savedState).events);
    //   setQuestionPageNum(JSON.parse(savedState).questionPageNum);
    //   setModalPageNum(1);
    // } else {
    //   setModalPageNum(2);
    //   createPost();
    // }

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
    const options = {
      method: "POST",
      body: JSON.stringify({
        data: {
          graph: {
            create: { dummy: false },
          },
        },
        select: {
          id: true,
          graph: {
            select: {
              id: true,
            },
          },
        },
      }),
    };
    const response = await fetch("/api/post", options);
    const data = await response.json();
    setGraphId(data.graph.id);
    setPostId(data.id);
  }

  function reset() {
    localStorage.removeItem("savedPost");
    setEvents([]);
    setGraphId("");
    setModalPageNum(2);
    setQuestionPageNum(NaN);
    createPost();
  }

  return (
    <>
    <div className={styles.container}>
      <Navigation />
      <div className="absolute right-8 top-6">
        <AuthButtonHeader />
      </div>
      <ModalsMain
        {...{
          modalPageNum,
          setModalPageNum,
          setQuestionPageNum,
          setEvents,
          reset,
          graphId,
          setEventId,
          setSpecificYearId,
        }}
      />
      <div className={styles.graphContainer}>
        <Graph {...{ events }} />
      </div> */}
        <div className={styles.questionsContainer}>
          <QuestionsMain
            {...{
              setModalPageNum,
              questionPageNum,
              setQuestionPageNum,
              events,
              setEvents,
              reset,
              graphId,
              eventId,
              specificYearId,
              setEventId,
              setSpecificYearId,
            }}
          />
        </div>
      </div>
      <CreatePageAuthModal isOpen={isModalOpen} />
    </>
  );
}
