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
  updateIsAgeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateIsIntroModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
}

export const CreatePageContext = createContext<CreatePageContextInterface>({
  userInput: [],
  updateUserInput: () => {},
  graphId: "",
  yearBorn: NaN,
  updateYearBorn: () => {},
  updateIsContinueModalOpen: () => {},
  updateIsAgeModalOpen: () => {},
  updateIsIntroModalOpen: () => {},
  reset: () => {}
});

export default function CreatePageContextProvider({
  userInput,
  updateUserInput,
  graphId,
  yearBorn,
  updateYearBorn,
  updateIsAgeModalOpen,
  updateIsContinueModalOpen,
  updateIsIntroModalOpen,
  reset,
  children,
}: {
  userInput: FormState[];
  updateUserInput: React.Dispatch<React.SetStateAction<FormState[]>>;
  graphId: string;
  yearBorn: number;
  updateYearBorn: React.Dispatch<React.SetStateAction<number>>;
  updateIsContinueModalOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  updateIsAgeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateIsIntroModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
        updateIsAgeModalOpen,
        updateIsIntroModalOpen,
        reset,
      }}>
      {children}
    </CreatePageContext.Provider>
  );
}
