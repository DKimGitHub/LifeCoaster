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

import { Peralta } from "next/font/google";
import { Cabin_Sketch } from "next/font/google";

const courgette = Cabin_Sketch({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const neuchaLight = Peralta({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

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
                    <OptionButton>CREATE</OptionButton>
                  </Link>
                  <Link
                    className="fade-list-item h-full w-full animation-delay-600"
                    href="/list">
                    <OptionButton>LIST</OptionButton>
                  </Link>
                  <div className="fade-list-item h-full w-full animation-delay-1100">
                    <button
                      className={`${neuchaLight.className} ${optionButtonStyles.button}`}>
                      <label
                        htmlFor="my-modal-4"
                        className={optionButtonStyles.label}>
                        <span className={optionButtonStyles.span}>LOGIN</span>
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
