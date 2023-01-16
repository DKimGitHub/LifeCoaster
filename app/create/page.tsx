"use client";

import React, { useState, useEffect } from "react";
import createStyles from "../../styles/create.module.css";
import CreatePageGraph from "../../components/CreatePageGraph";
import CreateForm from "../../components/CreateForm";
import Modal from "react-modal";
import CreatePageAgeModal from "../../components/CreatePageAgeModal";

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
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem("savedPost");
    if (savedState) {
      setUserInput(JSON.parse(savedState).userInput);
      setGraphId(JSON.parse(savedState).graphId);
      setFirstNode(JSON.parse(savedState).firstNode);
      setIsModalOpen(false);
    } else {
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
      width: "50%",
      maxWidth: "72rem",
      maxHeight: "36rem",
    },
    overlay: {
      backgroundColor: "hsla(0,0%,0%,0.3)",
    },
  };

  function closeModal() {
    setIsModalOpen(false);
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

  function updateIsModalOpen(input: React.SetStateAction<boolean>) {
    setIsModalOpen(input);
  }

  function reset() {
    localStorage.removeItem("userInput");
    setUserInput([]);
    createPost();
    setIsModalOpen(true);
  }

  return (
    <CreatePageContext
      userInput={userInput}
      updateUserInput={updateUserInput}
      graphId={graphId}
      firstNode = {firstNode}
      updateFirstNode={updateFirstNode}
      updateIsModalOpen={updateIsModalOpen}>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Post Modal"
        ariaHideApp={false}
        closeTimeoutMS={150}
        style={customStyles}>
        <CreatePageAgeModal />
      </Modal>{" "}
      <button onClick={reset}>start from scratch</button>
      <div className="flex flex-col items-center">
        <div className="mt-10 aspect-[21/5] w-full border border-black text-center">
          <CreatePageGraph />
        </div>
        <div className={createStyles.formContainer}>
          <CreateForm />
        </div>
      </div>
    </CreatePageContext>
  );
}
