"use client";

import { createContext } from "react";
import { eventType, nodeType } from "./types";

interface CreatePageContextInterface {
  graphId: string;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  nodes: nodeType;
  setNodes: React.Dispatch<React.SetStateAction<nodeType>>;
  phantomNodes: nodeType;
  setPhantomNodes: React.Dispatch<React.SetStateAction<nodeType>>;
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
  nodes: [],
  setNodes: (value) => {},
  phantomNodes: [],
  setPhantomNodes: (value) => {},
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
  nodes,
  setNodes,
  phantomNodes,
  setPhantomNodes,
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
  nodes: nodeType;
  setNodes: React.Dispatch<React.SetStateAction<nodeType>>;
  phantomNodes: nodeType;
  setPhantomNodes: React.Dispatch<React.SetStateAction<nodeType>>;
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
        nodes, 
        setNodes,
        phantomNodes, 
        setPhantomNodes,
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
