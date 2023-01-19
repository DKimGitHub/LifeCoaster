"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import Graph from "../../components/createPage/CreatePageGraph";
import Form from "../../components/createPage/CreatePageForm";
import AgeModal from "../../components/createPage/CreatePageAgeModal";
import ContinueModal from "../../components/createPage/CreatePageContinueModal";
import IntroModal from "../../components/createPage/CreatePageIntroModal";

import CreatePageContext from "../../lib/CreatePageContext";
import { FormState, DOBType } from "../../lib/types";
import styles from "../../styles/createPage/create.module.css";

export default function Page() {
  const [userInput, setUserInput] = useState<FormState[]>([]);
  const [graphId, setGraphId] = useState<string>("");
  const [yearBorn, setYearBorn] = useState<number>(NaN);
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isContinueModalOpen, setIsContinueModalOpen] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("savedPost");
    if (savedState) {
      setUserInput(JSON.parse(savedState).userInput);
      setGraphId(JSON.parse(savedState).graphId);
      setIsContinueModalOpen(true);
    } else {
      setIsContinueModalOpen(false);
      setIsAgeModalOpen(true);
      createPost();
    }
  }, []);

  useEffect(() => {
    const savedPost = {
      userInput: userInput,
      graphId: graphId,
      yearBorn: yearBorn,
    };
    localStorage.setItem("savedPost", JSON.stringify(savedPost));
  }, [userInput, graphId, yearBorn]);

  async function createPost() {
    const options = {
      method: "POST",
      body: JSON.stringify({
        data: {
          graph: {
            create: { isYear: false },
          },
        },
        include: {
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
  }

  //Function sent through ContextProvider for changing the node states
  function updateUserInput(input: React.SetStateAction<FormState[]>) {
    setUserInput(input);
  }

  function updateYearBorn (input: React.SetStateAction<number>){
    setYearBorn(input)
  }

  function updateisAgeModalOpen(input: React.SetStateAction<boolean>) {
    setIsAgeModalOpen(input);
  }

  function updateIsContinueModalOpen(input: React.SetStateAction<boolean>) {
    setIsContinueModalOpen(input);
  }

  function reset() {
    localStorage.removeItem("savedPost");
    setUserInput([]);
    createPost();
    setIsAgeModalOpen(true);
  }

  return (
    <CreatePageContext
      userInput={userInput}
      updateUserInput={updateUserInput}
      graphId={graphId}
      yearBorn = {yearBorn}
      updateYearBorn = {updateYearBorn}
      updateIsContinueModalOpen={updateIsContinueModalOpen}
      updateisAgeModalOpen={updateisAgeModalOpen}
      reset={reset}>
      <AgeModal isModalOpen={isAgeModalOpen}/>
      <ContinueModal isModalOpen={isContinueModalOpen}/>
      <IntroModal/>
      <div className="flex flex-col items-center">
        <div className="mt-10 h-60 w-full text-center">
          <Graph />
        </div>
        <div className={styles.resetContainer}>
          <button className={styles.resetButton} onClick={reset}>
            start from scratch
          </button>
        </div>
        <div className={styles.formContainer}>
          <Form />
        </div>
      </div>
    </CreatePageContext>
  );
}
