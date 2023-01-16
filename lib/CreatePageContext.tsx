"use client";

import { createContext } from "react";
import { dataType, FormState, DOBType } from "./types";

interface CreatePageContextInterface {
  userInput: FormState[];
  updateUserInput: React.Dispatch<React.SetStateAction<FormState[]>>;
  graphId: string;
  firstNode: {dateOfBirth: DOBType, value: number};
  updateFirstNode: React.Dispatch<React.SetStateAction<{dateOfBirth: DOBType, value: number}>>;
  updateIsContinueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateisAgeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
}

export const CreatePageContext = createContext<CreatePageContextInterface>({
  userInput: [],
  updateUserInput: () => {},
  graphId: "",
  firstNode: {
    dateOfBirth: {
      year: NaN,
      month: NaN,
      day: NaN,
    },
    value: NaN,
  },
  updateFirstNode: () => {},
  updateIsContinueModalOpen: () => {},
  updateisAgeModalOpen: () => {},
  reset: () => {}
});

export default function CreatePageContextProvider({
  userInput,
  updateUserInput,
  graphId,
  firstNode,
  updateFirstNode,
  updateisAgeModalOpen,
  updateIsContinueModalOpen,
  reset,
  children,
}: {
  userInput: FormState[];
  updateUserInput: React.Dispatch<React.SetStateAction<FormState[]>>;
  graphId: string;
  firstNode: {dateOfBirth: DOBType, value: number};
  updateFirstNode: React.Dispatch<React.SetStateAction<{dateOfBirth: DOBType, value: number}>>;
  updateIsContinueModalOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  updateisAgeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void
  children: React.ReactNode;
}) {
  return (
    <CreatePageContext.Provider
      value={{
        userInput,
        updateUserInput,
        graphId,
        firstNode,
        updateFirstNode,
        updateIsContinueModalOpen,
        updateisAgeModalOpen,
        reset,
      }}>
      {children}
    </CreatePageContext.Provider>
  );
}
