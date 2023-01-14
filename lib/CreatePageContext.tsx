"use client";

import { createContext } from "react";
import { dataType, FormState } from "./types";

interface CreatePageContextInterface {
  userInput: FormState[];
  updateUserInput: (input: React.SetStateAction<FormState[]>) => void;
  graphId: string;
}

export const CreatePageContext = createContext<CreatePageContextInterface>({
  userInput: [],
  updateUserInput: () => {},
  graphId: "",
});

export default function CreatePageContextProvider({
  userInput,
  updateUserInput,
  graphId,
  children,
}: {
  userInput: FormState[];
  updateUserInput: React.Dispatch<React.SetStateAction<FormState[]>>;
  graphId: string;
  children: React.ReactNode;
}) {
  return (
    <CreatePageContext.Provider value={{ userInput, updateUserInput, graphId }}>
      {children}
    </CreatePageContext.Provider>
  );
}

