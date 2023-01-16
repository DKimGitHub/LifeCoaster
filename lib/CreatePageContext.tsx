"use client";

import { createContext } from "react";
import { dataType, FormState, DOBType } from "./types";

interface CreatePageContextInterface {
  userInput: FormState[];
  updateUserInput: React.Dispatch<React.SetStateAction<FormState[]>>;
  graphId: string;
  firstNode: {dateOfBirth: DOBType, value: number};
  updateFirstNode: React.Dispatch<React.SetStateAction<{dateOfBirth: DOBType, value: number}>>;
  updateIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  updateIsModalOpen: () => {},
});

export default function CreatePageContextProvider({
  userInput,
  updateUserInput,
  graphId,
  firstNode,
  updateFirstNode,
  updateIsModalOpen,
  children,
}: {
  userInput: FormState[];
  updateUserInput: React.Dispatch<React.SetStateAction<FormState[]>>;
  graphId: string;
  firstNode: {dateOfBirth: DOBType, value: number};
  updateFirstNode: React.Dispatch<React.SetStateAction<{dateOfBirth: DOBType, value: number}>>;
  updateIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
        updateIsModalOpen,
      }}>
      {children}
    </CreatePageContext.Provider>
  );
}
