"use client";

import React, { useState, createContext } from "react";
import createStyles from "../../styles/create.module.css";
import Graph from "../../components/Graph";
import CreateForm from "../../components/CreateForm"
import { findAncestor } from "typescript";

export const CreateContext = createContext("defaultValue");

export default function Page() {

  const [userInput, setUserInput] = useState<FormState[]>([
    { year: 1995, value: 0 },
  ]);

  interface FormState {
    year: number;
    value: number;
  }

  function updateUserInput (input:FormState[]) {
    setUserInput(input);
  }

  return (
    <CreateContext.Provider value={{userInput, updateUserInput}}>
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
