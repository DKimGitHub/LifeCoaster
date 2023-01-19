"use client";

import React, { useState, useEffect } from "react";
import createStyles from "../../styles/create.module.css";
import CreatePageGraph from "../../components/CreatePageGraph";
import CreateForm from "../../components/CreateForm";
import Modal from "react-modal";
import CreatePageAgeModal from "../../components/CreatePageAgeModal";
import CreatePageContinueModal from "../../components/CreatePageContinueModal";

import CreatePageContext from "../../lib/CreatePageContext";
import { FormState, DOBType } from "../../lib/types";

export default function Page() {
  const [userInput, setUserInput] = useState<FormState[]>([]);
  const [graphId, setGraphId] = useState<string>("");
  const [firstNode, setFirstNode] = useState<{
    dateOfBirth: DOBType;
    value: number;
  }>({
    dateOfBirth: {
      year: NaN,
      month: NaN,
      day: NaN,
    },
    value: NaN,
  });
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isContinueModalOpen, setIsContinueModalOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem("savedPost");
    if (savedState) {
      setUserInput(JSON.parse(savedState).userInput);
      setGraphId(JSON.parse(savedState).graphId);
      setFirstNode(JSON.parse(savedState).firstNode);
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
      firstNode: firstNode,
    };
    localStorage.setItem("savedPost", JSON.stringify(savedPost));
  }, [userInput, graphId, firstNode]);

  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      marginX: "auto",
      maxWidth: "72rem",
      maxHeight: "36rem",
    },
    overlay: {
      backgroundColor: "hsla(0,0%,0%,0.3)",
    },
  };

  function closeModal() {
    setIsAgeModalOpen(false);
  }

  function closeContinueModal() {
    setIsContinueModalOpen(false);
  }

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

  function updateFirstNode(
    input: React.SetStateAction<{ dateOfBirth: DOBType; value: number }>
  ) {
    setFirstNode(input);
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
    console.log(userInput);
    createPost();
    setIsAgeModalOpen(true);
  }

  return (
    <CreatePageContext
      userInput={userInput}
      updateUserInput={updateUserInput}
      graphId={graphId}
      firstNode={firstNode}
      updateFirstNode={updateFirstNode}
      updateIsContinueModalOpen={updateIsContinueModalOpen}
      updateisAgeModalOpen={updateisAgeModalOpen}
      reset={reset}>
      <Modal
        isOpen={isContinueModalOpen}
        onRequestClose={closeContinueModal}
        contentLabel="Continue Modal"
        ariaHideApp={false}
        closeTimeoutMS={150}
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <CreatePageContinueModal />
      </Modal>{" "}
      <Modal
        isOpen={isAgeModalOpen}
        onRequestClose={closeModal}
        contentLabel="Age Modal"
        ariaHideApp={false}
        closeTimeoutMS={150}
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <CreatePageAgeModal />
      </Modal>
      {""}
      <div className="flex flex-col items-center">
        <div className="mt-10 h-60 w-full border border-black text-center">
          <CreatePageGraph />
        </div>
        <div className={createStyles.resetContainer}>
          <button className={createStyles.resetButton} onClick={reset}>
            start from scratch
          </button>
        </div>
        <div className={createStyles.formContainer}>
          <CreateForm />
        </div>
      </div>
    </CreatePageContext>
  );
}
