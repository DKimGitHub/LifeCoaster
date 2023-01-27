"use client";

import { createContext } from "react";
import { eventType } from "./types";

interface CreatePageContextInterface {
  graphId: string;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  modalPageNum: number;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
}

export const CreatePageContext = createContext<CreatePageContextInterface>({
  graphId: "",
  events: [],
  setEvents: (value) => {},
  modalPageNum: NaN,
  setModalPageNum: (value) => {},
  isModalOpen: false,
  setIsModalOpen: (value) => {},
  questionPageNum: NaN,
  setQuestionPageNum: (value) => {},
  reset: () => {},
});

export default function CreatePageContextProvider({
  graphId,
  events,
  setEvents,
  modalPageNum,
  setModalPageNum,
  isModalOpen,
  setIsModalOpen,
  questionPageNum,
  setQuestionPageNum,
  reset,
  children,
}: {
  graphId: string;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
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
        graphId,
        events,
        setEvents,
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
