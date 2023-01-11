"use client";

import React, { useState, useEffect, createContext } from "react";
import createStyles from "../../styles/create.module.css";
import Graph from "../../components/Graph";
import CreateForm from "../../components/CreateForm";
import useSWR from "swr";
import { findAncestor } from "typescript";
import { useFetcher } from "react-router-dom";
import { json } from "stream/consumers";

export const CreateContext = createContext("defaultValue");

export default function Page() {
  //Form Type
  interface FormState {
    year: number;
    value: number;
  }

   //Node states
   const [userInput, setUserInput] = useState<FormState[]>([
    { year: 1995, value: 0 },
  ]);
  const [graphId, setGraphId] = useState<number>();

  useEffect(() => {
    createPost();
  }, []);

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
  function updateUserInput(input: FormState[]) {
    setUserInput(input);
  }

  return (
    <CreateContext.Provider value={{ userInput, updateUserInput, graphId }}>
      <div className="flex flex-col items-center">
        <div className="mt-10 aspect-[21/5] w-full border border-black text-center">
          <Graph />
        </div>
        <div className={createStyles.formContainer}>
          <CreateForm />
        </div>
      </div>
    </CreateContext.Provider>
  );
}
