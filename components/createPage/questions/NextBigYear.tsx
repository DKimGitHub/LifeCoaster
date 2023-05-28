import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ToolBar from "./ToolBar";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, eventType } from "../../../lib/types";
import Select from "../tools/YearSelect";
import PageTransition from "../../PageTransition";

export default function NextBigYear({
  questionPageNum,
  setQuestionPageNum,
  events,
  setEvents,
  reset,
  graphId,
  eventId,
  setEventId,
  setSpecificYearId,
}: {
  questionPageNum: number;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  events: eventType;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  reset: () => void;
  graphId: String;
  eventId: String;
  setEventId: React.Dispatch<React.SetStateAction<String>>;
  setSpecificYearId: React.Dispatch<React.SetStateAction<String>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  /*
  If the current period is the period right after the birth year, 
  the period starts from birth year + 1. Otherwise, the period starts from the previous year.
  */
  useEffect(() => {
    events.length === 1
      ? setValue("yearSelect", events.slice(-1)[0].nextYear + 1)
      : setValue("yearSelect", events.slice(-1)[0].nextYear);
  }, [setValue, events]);

  function handlePrevButton() {
    events.length === 1 ? setQuestionPageNum(1) : setQuestionPageNum(4);
  }

  function handleNextButton(data: dataType) {
    setQuestionPageNum(3);
    const newYear: number =
      events.length > 2
        ? events.slice(-2)[0].nextYear
        : events.slice(-2)[0].nextYear + 1;

    setEvents((prev) => {
      return [
        ...prev,
        {
          nextYear: data.yearSelect,
          type: null,
          period: { value: 0, description: "" },
          specificYear: [
            {
              year: newYear,
              value: 0,
              description: "",
            },
          ],
        },
      ];
    });

    updateDBAdd(data, newYear);
  }

  async function updateDBAdd(input: dataType, newYear: number) {
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
                nextYear: input.yearSelect,
                type: null,
                period: {
                  create: { value: 0, description: "" },
                },
                specificYear: {
                  create: [
                    {
                      year: newYear,
                      value: 0,
                      description: "",
                    },
                  ],
                },
              },
            ],
          },
        },
        include: {
          event: {
            include: {
              specificYear: true,
            },
          },
        },
      }),
    };
    const response = await fetch("/api/post/graph/", options);
    const data = await response.json();
    setEventId(data.event.slice(-1)[0].id);
    setSpecificYearId(data.event.slice(-1)[0].specificYear.slice(-1)[0].id);
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
          }}
        />
      </div>
      <PageTransition>
        <div className={styles.question}>
          <label className={styles.questionText}>
            When was your next big event?
          </label>
          <div
            style={{
              height: "fit-content",
              display: "flex",
              flexDirection: "row",
            }}>
            <p
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                width: "fit-content",
              }}>{`${events.slice(-1)[0].nextYear} ~ `}</p>
            <Controller
              name="yearSelect"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  reverse={false}
                  onChange={onChange}
                  start={events.slice(-1)[0].nextYear + 1}
                  end={new Date().getFullYear()}
                  defaultValue={events.slice(-1)[0].nextYear + 1}
                />
              )}
            />
            {errors.yearSelect && (
              <p style={{ display: "inline", color: "red" }}>
                {errors.yearSelect.message as string}
              </p>
            )}
          </div>
        </div>
      </PageTransition>
    </form>
  );
}
