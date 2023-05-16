"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import styles from "../styles/mainPage.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import StartButton from "../components/buttons/MainPageStartButton";

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
            <Image src={logo} alt={"logo"}></Image>
          </div>
          {(() => {
            if (!startClicked) {
              return (
                <div className={styles.startButtonContainer}>
                  <StartButton onClick={startButtonClicked} startClicked={startClicked}/>
                </div>
              );
            } else {
              return (
                <>
                  <Link
                    className="fade-list-item h-full w-full animation-delay-1000"
                    href="/create">
                    <Button
                      auto
                      css={{
                        height: "100%",
                        width: "100%",
                        color: "black",
                        fontSize: "1.5rem",
                        fontFamily: "courier",
                        "@sm": { fontSize: "4rem" },
                      }}>
                      CREATE
                    </Button>
                  </Link>
                  <Link
                    className="fade-list-item h-full w-full  animation-delay-1500"
                    href="/list">
                    <Button
                      auto
                      css={{
                        height: "100%",
                        width: "100%",
                        color: "black",
                        fontSize: "1.5rem",
                        fontFamily: "courier",
                        "@sm": { fontSize: "4rem" },
                      }}>
                      LIST
                    </Button>
                  </Link>

                  <Button
                    as="label"
                    //@ts-expect-error
                    htmlFor="my-modal-4"
                    auto
                    className="fade-list-item animation-delay-2000"
                    css={{
                      height: "100%",
                      width: "100%",
                      color: "black",
                      fontSize: "1.5rem",
                      fontFamily: "courier",
                      "@sm": { fontSize: "4rem" },
                    }}>
                    LOGIN
                  </Button>
                </>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
}
