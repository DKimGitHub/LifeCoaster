"use client";

import { createContext } from "react";
import { dataType, FormState, DOBType } from "./types";

interface CreatePageContextInterface {
  userInput: FormState[];
  updateUserInput: React.Dispatch<React.SetStateAction<FormState[]>>;
  graphId: string;
  yearBorn: number;
  updateYearBorn: React.Dispatch<React.SetStateAction<number>>;
  updateIsContinueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateisAgeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
}

export const CreatePageContext = createContext<CreatePageContextInterface>({
  userInput: [],
  updateUserInput: () => {},
  graphId: "",
  yearBorn: NaN,
  updateYearBorn: () => {},
  updateIsContinueModalOpen: () => {},
  updateisAgeModalOpen: () => {},
  reset: () => {}
});

export default function CreatePageContextProvider({
  userInput,
  updateUserInput,
  graphId,
  yearBorn,
  updateYearBorn,
  updateisAgeModalOpen,
  updateIsContinueModalOpen,
  reset,
  children,
}: {
  userInput: FormState[];
  updateUserInput: React.Dispatch<React.SetStateAction<FormState[]>>;
  graphId: string;
  yearBorn: number;
  updateYearBorn: React.Dispatch<React.SetStateAction<number>>;
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
        yearBorn,
        updateYearBorn,
        updateIsContinueModalOpen,
        updateisAgeModalOpen,
        reset,
      }}>
      {children}
    </CreatePageContext.Provider>
  );
}
