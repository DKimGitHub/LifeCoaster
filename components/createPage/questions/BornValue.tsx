import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import ToolBar from "./ToolBar";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, eventType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";
import PageTransition from "../../PageTransition";
import { eventsToNodes } from "../../../lib/helpers";

export default function BornValue({
  questionPageNum,
  setQuestionPageNum,
  setModalPageNum,
  setIsModalOpen,
  events,
  setEvents,
  reset,
  specificYearId,
  eventId,
  graphId,
  setEventId,
  setSpecificYearId,
  setIsCompleteModalOpen,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  specificYearId: String;
  eventId: String;
  graphId: String;
  setEventId: React.Dispatch<React.SetStateAction<String>>;
  setSpecificYearId: React.Dispatch<React.SetStateAction<String>>;
  setIsCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const currentYear = events.slice(-1)[0].nextYear;

  //Sets the default slider value
  useEffect(() => {
    setValue("valueSlider", 0);
  }, [setValue]);

  /*
    Go back to the age modal.
    Year of birth is removed from the event array. 
  */

  async function handlePrevButton() {
    setQuestionPageNum(NaN);
    setModalPageNum(3);
    setEvents([]);
    updateDBDeleteEvent()
    setEventId("");
    setIsModalOpen(true);
  }

  function handleNextButton() {
    setQuestionPageNum(2);
    createNewEvent();
    updateDBCreateNewEvent();
  }

  function updateOnValueChange(value: number) {
    updateEventsBornValue(value);
    updateDBBornValue(value);
  }
 
  //Deletes the event.
  async function updateDBDeleteEvent() {
    await fetch(`/api/post/graph/event/${eventId}/deleteEvent`);
  }

  //Creates a new event 
  function createNewEvent() {
    setEvents((prev) => {
      return [
        ...prev,
        {
          nextYear: currentYear + 1,
          type: null,
          period: { value: 0, description: "" },
          specificYear: [],
        },
      ];
    });
  }

  //Create a new event on the database
  async function updateDBCreateNewEvent() {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: graphId,
        },
        data: {
          event: {
            create: [
              {
                nextYear: 0,
                type: null,
                period: {
                  create: { value: 0, description: "" },
                },
                specificYear: {
                  create: [],
                },
              },
            ],
          },
        },
        include: {
          event: true,
        },
      }),
    };
    const response = await fetch("/api/post/graph/", options);
    const data = await response.json();
    setEventId(data.event.slice(-1)[0].id);
  }

  //update the next year on the first event, which is the only event present currently.
  function updateEventsBornValue(value: number) {
    setEvents((prev) => [
      {
        ...prev[0],
        period: { ...prev[0].period, value: value },
      },
    ]);
  }

  async function updateDBBornValue(input: number) {
    const options: any = {
      method: "PUT",
      body: JSON.stringify({
        where: {
          id: eventId,
        },
        data: {
          period: {
            update: {
              value: input
            }
          }
        },
      }),
    };
    const response = await fetch("/api/post/graph/event/", options);
    const data = await response.json();
  }

  return (
    <form className={styles.questionContainer}>
      <div className={styles.toolContainer}>
        <ToolBar
          {...{
            handlePrevButton,
            handleNextButton,
            questionPageNum,
            handleSubmit,
            reset,
            setEvents,
            eventId,
            setIsCompleteModalOpen,
          }}
        />
      </div>
      <PageTransition>
        <div className={styles.question}>
          <label className={styles.questionText}>
            How content were you when you were born?
          </label>
          <div className={styles.questionTool}>
            <Controller
              name="valueSlider"
              control={control}
              render={() => (
                <Slider onChange={updateOnValueChange} defaultValue={0} />
              )}
            />
            {errors.valueSlider && (
              <p style={{ display: "inline", color: "red" }}>
                {errors.valueSlider.message as string}
              </p>
            )}
          </div>
        </div>
      </PageTransition>
    </form>
  );
}
