"use client";

import { createContext } from "react";
import { dataType, FormState, DOBType } from "./types";

interface CreatePageContextInterface {
  userInput: dataType;
  setUserInput: React.Dispatch<React.SetStateAction<dataType[]>>;
  graphId: string;
  yearBorn: number;
  setYearBorn: React.Dispatch<React.SetStateAction<number>>;
  nextBigEvent: number;
  setNextBigEvent: React.Dispatch<React.SetStateAction<number>>;
  prevBigEvent: number;
  setPrevBigEvent: React.Dispatch<React.SetStateAction<number>>;
  modalPageNum: number;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
}

export const CreatePageContext = createContext<CreatePageContextInterface>({
  userInput: {},
  setUserInput: (value) => {},
  graphId: "",
  yearBorn: NaN,
  setYearBorn: (value) => {},
  nextBigEvent: 1900,
  setNextBigEvent: (value) => {},
  prevBigEvent: 1900,
  setPrevBigEvent: (value) => {},
  modalPageNum: NaN,
  setModalPageNum: (value) => {},
  isModalOpen: false,
  setIsModalOpen: (value) => {},
  questionPageNum: NaN,
  setQuestionPageNum: (value) => {},
  reset: () => {},
});

export default function CreatePageContextProvider({
  userInput,
  setUserInput,
  graphId,
  yearBorn,
  setYearBorn,
  nextBigEvent,
  setNextBigEvent,
  prevBigEvent,
  setPrevBigEvent,
  modalPageNum,
  setModalPageNum,
  isModalOpen,
  setIsModalOpen,
  questionPageNum,
  setQuestionPageNum,
  reset,
  children,
}: {
  userInput: dataType;
  setUserInput: React.Dispatch<React.SetStateAction<dataType[]>>;
  graphId: string;
  yearBorn: number;
  setYearBorn: React.Dispatch<React.SetStateAction<number>>;
  nextBigEvent: number;
  setNextBigEvent: React.Dispatch<React.SetStateAction<number>>;
  prevBigEvent: number;
  setPrevBigEvent: React.Dispatch<React.SetStateAction<number>>;
  modalPageNum: number;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
  children: any;
}) {
  return (
    <CreatePageContext.Provider
      value={{
        userInput,
        setUserInput,
        graphId,
        yearBorn,
        setYearBorn,
        nextBigEvent,
        setNextBigEvent,
        prevBigEvent,
        setPrevBigEvent,
        modalPageNum,
        setModalPageNum,
        isModalOpen,
        setIsModalOpen,
        questionPageNum,
        setQuestionPageNum,
        reset,
      }}>
      {children}
    </CreatePageContext.Provider>
  );
}
