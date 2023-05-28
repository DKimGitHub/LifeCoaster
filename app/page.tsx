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
import PageTransition from "../components/PageTransition";

import { Neucha } from "next/font/google";
import { Courgette } from "next/font/google";

const courgette = Courgette({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const neuchaLight = Neucha({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

export default function Home(ref: IndexPageRef) {
  const [startClicked, setStartClicked] = useState(false);

  function startButtonClicked() {
    setTimeout(() => {
      setStartClicked(true);
    }, 800);
  }

  return (
    <PageTransition ref={ref}>
      <div className={styles.background}>
        <div className={styles.mainContainer}>
          <div className={styles.gridContainer}>
            <div className={styles.mainTextContainer}>
              <Image src={logo} alt={"logo"} priority></Image>
            </div>
            {(() => {
              if (!startClicked) {
                return (
                  <div
                    className={`${courgette.className} ${styles.startButtonContainer}`}>
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
                      <button
                        className={`${neuchaLight.className} ${optionButtonStyles.button}`}>
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
    </PageTransition>
  );
}
