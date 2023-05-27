"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import styles from "../styles/mainPage.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import StartButton from "../components/buttons/MainPageStartButton";
import OptionButton from "../components/buttons/MainPageOptionButton";
import optionButtonStyles from "../styles/mainPageOptionButton.module.css";
import { Inter } from 'next/font/google';
 
const inter = Inter({ subsets: ['latin'] });
// import { Kalam } from "next/font/google";

// const kalam = Kalam({ weight: "700", subsets: ["latin"] });

export default function Home() {
  const [startClicked, setStartClicked] = useState(false);

  function startButtonClicked() {
    setTimeout(() => {
      setStartClicked(true);
    }, 800);
  }

  return (
    <div className={styles.background}>
      <div className={styles.mainContainer}>
        <div className={styles.gridContainer}>
          <div className={styles.mainTextContainer}>
            <Image src={logo} alt={"logo"} priority></Image>
          </div>
          {(() => {
            if (!startClicked) {
              return (
                <div>
                  <StartButton
                    onClick={startButtonClicked}
                    startClicked={startClicked}
                  />
                </div>
              );
            } else {
              return (
                <>
                  <Link
                    className="fade-list-item h-full w-full animation-delay-100"
                    href="/create">
                    <OptionButton>create</OptionButton>
                  </Link>
                  <Link
                    className="fade-list-item h-full w-full animation-delay-600"
                    href="/list">
                    <OptionButton>list</OptionButton>
                  </Link>
                  <div className="fade-list-item h-full w-full animation-delay-1100">
                    <button className={optionButtonStyles.button}>
                      <label
                        htmlFor="my-modal-4"
                        className={optionButtonStyles.label}>
                        <span className={optionButtonStyles.span}>login</span>
                      </label>
                    </button>
                  </div>
                </>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
}
