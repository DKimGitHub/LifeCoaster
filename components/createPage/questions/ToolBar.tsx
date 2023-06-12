import React, { useState } from "react";
import { UseFormHandleSubmit, FieldValues } from "react-hook-form";
import styles from "../../../styles/createPage/form.module.css";
import Image from "next/image";
import previousIcon from "../../../public/createPage/previous.svg";
import nextIcon from "../../../public/createPage/next.svg";
import resetIcon from "../../../public/createPage/reset.svg";

import { dataType, eventType } from "../../../lib/types";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function ToolBar({
  handlePrevButton,
  handleNextButton,
  questionPageNum,
  handleSubmit,
  reset,
  mode,
  setMode,
  events,
  setEvents,
  setGraphId,
  postId,
  graphId,
  name,
  setPostId,
  setIsCompleteModalOpen,
}: {
  handlePrevButton: () => void;
  handleNextButton: (data: dataType) => void;
  questionPageNum: number;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: () => void;
  mode?: "period" | "year";
  setMode?: React.Dispatch<React.SetStateAction<"period" | "year">>;
  setEvents?: React.Dispatch<React.SetStateAction<eventType>>;
  setGraphId: React.Dispatch<React.SetStateAction<String>>;
  setPostId: React.Dispatch<React.SetStateAction<String>>;
  postId: String;
  graphId: String;
  name: String;
  events: eventType;
  setIsCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const setModeToolBar = setMode ? setMode : () => null;
  const setEventsToolBar = setEvents ? setEvents : () => null;

  function handleMode(
    event: React.MouseEvent<HTMLElement>,
    newMode: "period" | "year"
  ) {
    setModeToolBar(newMode);
    if (newMode === "period") {
      setEventsToolBar((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev.slice(-1)[0],
          type: "period",
        },
      ]);
    } else if (newMode === "year") {
      setEventsToolBar((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev.slice(-1)[0],
          type: "specificYear",
        },
      ]);
    }
  }

  function doneButtonClicked(event: any) {
    event.preventDefault();
    setIsCompleteModalOpen(true);
    if (postId) {
      saveDB();
    } else {
      createPost();
    }
  }

  async function createPost() {
    var options = {
      method: "POST",
      body: JSON.stringify({
        data: {
          graph: {
            create: { dummy: false },
          },
          user: {
            create: {
              name: name,
            }
          }
        },
        select: {
          id: true,
          graph: {
            select: {
              id: true,
            },
          },
        },
      }),
    };
    const response = await fetch("/api/post", options);
    const data = await response.json();
    setGraphId(data.graph.id);
    setPostId(data.id);

    options = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: data.graph.id,
        },
        data: {
          event: {
            create:
              events.map(i => ({
                nextYear: i.nextYear,
                type: i.type,
                period: {
                  create: {
                    value: i.period.value,
                    description: i.period.description,
                  }
                },
                specificYear: {
                  create:
                    i.specificYear.map(j => ({
                      year: j.year,
                      value: j.value,
                      description: j.description,
                    }))
                }
              }))
            ,
          },
        },
      }),
    };
    await fetch("/api/post/graph", options);
  }

  async function saveDB() {
    await fetch(`/api/post/graph/${graphId}/delete`)
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: graphId,
        },
        data: {
          event: {
            create: [
              events.map(i => ({
                nextYear: i.nextYear,
                type: i.type,
                period: {
                  create: {
                    value: i.period.value,
                    description: i.period.description,
                  }
                },
                specificYear: {
                  create: [
                    i.specificYear.map(j => ({
                      year: j.year,
                      value: j.value,
                      description: j.description,
                    }))[0]
                  ]
                }
              }))[0]
            ],
          },
        },
      }),
    };
    await fetch("/api/post/graph", options);
  }

  return (
    <div className={styles.tool}>
      <div style={{ flex: "0.2" }}>
        <button className={styles.resetButton} onClick={reset}>
          <Image src={resetIcon} alt="resetIcon" width={30} height={30} />
        </button>
      </div>
      <div style={{ flex: "0.8" }}>
        {(() => {
          if (questionPageNum === 4) {
            if (
              events.slice(-2)[0].nextYear ===
              events.slice(-1)[0].nextYear - 1
            ) {
              return (
                <span className={styles.evaluatingPeriod}>
                  {events.slice(-2)[0].nextYear}
                </span>
              );
            } else {
              return (
                <span className={styles.evaluatingPeriod}>
                  {`${events.slice(-2)[0].nextYear} ~ ${events.slice(-1)[0].nextYear - 1
                    }`}
                </span>
              );
            }
          }
          else if (questionPageNum === 1) {
            return (
              <span className={styles.evaluatingPeriod}>
                {events.slice(-1)[0].nextYear}
              </span>
            );
          }
        })()}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <button className={styles.prevButton} onClick={handlePrevButton}>
          <Image src={previousIcon} alt="previousIcon" width={40} height={40} />
        </button>
        {(() => {
          if (questionPageNum === 4) {
            return (
              <div>
                <ToggleButtonGroup
                  size={"small"}
                  value={mode}
                  exclusive
                  onChange={handleMode}>
                  <ToggleButton value="period">
                    <span
                      style={{
                        color: "#45302b",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        margin: "0 0.3rem",
                      }}
                      className={pangolin.className}>
                      Period
                    </span>
                  </ToggleButton>
                  <ToggleButton value="year">
                    <span
                      style={{
                        color: "#45302b",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        margin: "0 0.3rem",
                      }}
                      className={pangolin.className}>
                      Year
                    </span>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            );
          }
        })()}
        <button
          className={styles.nextButton}
          onClick={handleSubmit(handleNextButton)}>
          <Image src={nextIcon} alt="nextIcon" width={40} height={40} />
        </button>
      </div>
      <div style={{ flex: "1", display: "flex", flexDirection: "row-reverse" }}>
        <button className={styles.doneButton} onClick={doneButtonClicked}>
          Save
        </button>
      </div>
    </div>
  );
}
