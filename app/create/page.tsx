"use client";

import React, { useState, useEffect } from "react";
import createStyles from "../../styles/create.module.css";
import CreatePageGraph from "../../components/CreatePageGraph";
import CreateForm from "../../components/CreateForm";

import CreatePageContext from "../../lib/CreatePageContext";
import { FormState } from "../../lib/types";
export default function Page() {
  //Form Type

  //Node states

  const [defaultNode, setDefaultNode] = useState<FormState[]>([{ xValue: 1995, yValue: 0 }]);
  const [userInput, setUserInput] = useState<FormState[]>(defaultNode);
  const [graphId, setGraphId] = useState<number>(0);

  useEffect(() => {
    const savedState = localStorage.getItem("userInput");
    savedState? setUserInput(JSON.parse(savedState)) : createPost ();
  }, []);

  useEffect(() => {
    localStorage.setItem("userInput", JSON.stringify(userInput));
  }, [userInput]);

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

  function reset() {
    localStorage.removeItem("userInput");
    setUserInput([{ xValue: 1995, yValue: 0 }]);
  }

  return (
    <CreatePageContext
      userInput={userInput}
      updateUserInput={updateUserInput}
      graphId={graphId}>
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
