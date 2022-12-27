'use client'
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
// test!
export default function Home() {
  const [counter, setCounter] = useState(0);
  function handler() {
    setCounter(counter + 1);
  } 
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-red-400 p-10 border border-white rounded-3xl text-center space-x-5">
        hello world x {counter}
      </div>
      <div className="">
        <button className="btn btn-primary btn-circle h-28 w-28 mt-8" onClick={handler}>im a button</button>
      </div>
    </div>
  );
}
