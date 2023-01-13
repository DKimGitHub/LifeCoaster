"use client";

import { createContext } from "react";
import { dataType, FormState } from "./types";

interface CreatePageContextInterface {
  userInput: FormState[];
  updateUserInput: (input: React.SetStateAction<FormState[]>) => void;
  graphId: number;
}

export const CreatePageContext = createContext<CreatePageContextInterface>({
  userInput: [],
  updateUserInput: () => {},
  graphId: NaN,
});

export default function CreatePageContextProvider({
  userInput,
  updateUserInput,
  graphId,
  children,
}: {
  userInput: FormState[];
  updateUserInput: (input: React.SetStateAction<FormState[]>) => void;
  graphId: number;
  children: React.ReactNode;
}) {
  return (
    <CreatePageContext.Provider value={{ userInput, updateUserInput, graphId }}>
      {children}
    </CreatePageContext.Provider>
  );
}

