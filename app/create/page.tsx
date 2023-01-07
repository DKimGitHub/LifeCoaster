"use client";

import React, { useState, createContext } from "react";
import createStyles from "../../styles/create.module.css";
import Graph from "../../components/Graph";
import CreateForm from "../../components/CreateForm"
import useSWR from 'swr'
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

  
  //fetcher function for SWR
  const fetcher = async (
    url: string,
    method: string
  ) => {
    const options = {
      method: method,
      body: JSON.stringify(
        {
          year: 1995,
          value: -10
        }
      )
    }
    return fetch(url, options).then(r => r.json());
  }

  const { data, error } = useSWR(['/api/graph', "POST"], ([url, method]) => fetcher(url, method))
  
 
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  //Function sent through ContextProvider for changing the node states
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
