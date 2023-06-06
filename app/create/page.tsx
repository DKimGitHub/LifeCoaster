"use client";

import React, { useState, useEffect } from "react";

import Graph from "../../components/createPage/Graph";
import QuestionsMain from "../../components/createPage/questions/QuestionsMain";
import ModalsMain from "../../components/createPage/modals/ModalsMain";
import CompleteModal from "../../components/createPage/modals/CompleteModal";

import { eventType, nodeType } from "../../lib/types";
import styles from "../../styles/createPage/create.module.css";
import Navigation from "../../components/Navigation";
import AuthButtonHeader from "../../components/AuthButtonHeader";
import CreatePageAuthModal from "../../components/CreatePageAuthModal";
import { useSession } from "next-auth/react";
import { eventsToNodes } from "../../lib/helpers";

export default function Page() {
  const { data: session } = useSession();

  const [postId, setPostId] = useState<String>("");
  const [graphId, setGraphId] = useState<String>("");
  const [eventId, setEventId] = useState<String>("");
  const [specificYearId, setSpecificYearId] = useState<String>("");
  const [events, setEvents] = useState<eventType>([]);
  const [modalPageNum, setModalPageNum] = useState<number>(NaN);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [isCompleteModalOpen, setIsCompleteModalOpen] =
    useState<boolean>(false);

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

  // useEffect(() => {
  //   if (!session) {
  //     setIsAuthModalOpen(true);
  //   } else if (session && isFirstTime) {
  //     setIsFirstTime(false);
  //     setIsAuthModalOpen(false);
  //     const savedState = localStorage.getItem("savedPost");
  //     if (savedState && !Number.isNaN(JSON.parse(savedState).questionPageNum)) {
  //       setGraphId(JSON.parse(savedState).graphId);
  //       setEvents(JSON.parse(savedState).events);
  //       setQuestionPageNum(JSON.parse(savedState).questionPageNum);
  //       setIsModalOpen(true);
  //       setModalPageNum(1);
  //     } else {
  //       setIsModalOpen(true);
  //       setModalPageNum(2);
  //       createPost();
  //     }
  //   }
  //   return () => {
  //     setGraphId("");
  //     setEvents([]);
  //     setQuestionPageNum(NaN);
  //     setIsModalOpen(false);
  //     setModalPageNum(NaN);
  //   };
  // }, []);

  //Initialization when the Create page mounts

  useEffect(() => {
    const savedState = localStorage.getItem("savedPost");
    if (savedState && !Number.isNaN(JSON.parse(savedState).questionPageNum)) {
      setGraphId(JSON.parse(savedState).graphId);
      setEventId(JSON.parse(savedState).eventId);
      setSpecificYearId(JSON.parse(savedState).specificYearId);
      setPostId(JSON.parse(savedState).postId);
      setEvents(JSON.parse(savedState).events);
      setQuestionPageNum(JSON.parse(savedState).questionPageNum);
      setIsModalOpen(true);
      setModalPageNum(1);
    } else {
      setIsModalOpen(true);
      setModalPageNum(2);
    }

    //clean up function
    // return () => {
    //   setGraphId("");
    //   setEventId("");
    //   setSpecificYearId("");
    //   setPostId("");
    //   setEvents([]);
    //   setQuestionPageNum(NaN);
    //   setIsModalOpen(false);
    //   setModalPageNum(NaN);
    // };
  }, []);

  //Update the local cache whenever these dependcies change.
  useEffect(() => {
    const savedState = {
      graphId: graphId,
      eventId: eventId,
      postId: postId,
      events: events,
      specificYearId: specificYearId,
      questionPageNum: questionPageNum,
    };
    if (postId) {
      localStorage.setItem("savedPost", JSON.stringify(savedState));
    }
  }, [graphId, eventId, events, specificYearId, postId, questionPageNum]);

  // async function createPost() {
  //   const options = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       data: {
  //         graph: {
  //           create: { dummy: false },
  //         },
  //       },
  //       select: {
  //         id: true,
  //         graph: {
  //           select: {
  //             id: true,
  //           },
  //         },
  //       },
  //     }),
  //   };
  //   const response = await fetch("/api/post", options);
  //   const data = await response.json();
  //   setGraphId(data.graph.id);
  //   setPostId(data.id);
  // }

  function reset() {
    localStorage.removeItem("savedPost");
    setEvents([]);
    setGraphId("");
    setEventId("");
    setPostId("");
    setSpecificYearId("");
    setIsModalOpen(true);
    setModalPageNum(2);
    setQuestionPageNum(NaN);
    //createPost();
  }

  return (
    <>
      <div className={styles.container}>
        <Navigation />
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
            isModalOpen,
            setIsModalOpen,
          }}
        />
        {/* <CompleteModal
          {...{ isCompleteModalOpen, setIsCompleteModalOpen, events }}
        /> */}
        <div className="absolute right-8 top-6">
          <AuthButtonHeader />
        </div>
        <div className={styles.graphContainer}>
          <Graph data={eventsToNodes(events)} />
        </div>
        <div className={styles.questionsContainer}>
          <QuestionsMain
            {...{
              setModalPageNum,
              questionPageNum,
              setQuestionPageNum,
              setIsModalOpen,
              events,
              setEvents,
              reset,
              graphId,
              eventId,
              specificYearId,
              setEventId,
              setSpecificYearId,
              setIsCompleteModalOpen,
            }}
          />
        </div>
      </div>
      {/* <CreatePageAuthModal isOpen={isAuthModalOpen} /> */}

    </>
  );
}
