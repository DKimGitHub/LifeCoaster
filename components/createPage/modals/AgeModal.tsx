import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { dataType, eventType } from "../../../lib/types";
import styles from "../../../styles/createPage/modal.module.css";
import Select from "../tools/YearSelect";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function AgeModal({
  setModalPageNum,
  setQuestionPageNum,
  setEvents,
  graphId,
  setEventId,
  setSpecificYearId,
  setIsModalOpen,
}: {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setQuestionPageNum: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<eventType>>;
  graphId: String;
  setEventId: React.Dispatch<React.SetStateAction<String>>;
  setSpecificYearId: React.Dispatch<React.SetStateAction<String>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  /*
    Closes the modal and sets the nextYear and specificYear with the birth year.
  */
  function onSubmit(data: dataType) {
    setIsModalOpen(false);
    setTimeout(() => {
      setQuestionPageNum(1);
      setModalPageNum(NaN);
    }, 1000);
    setEvents([
      {
        nextYear: data.yearSelect,
        type: "specificYear",
        period: {
          value: NaN,
          description: "",
        },
        specificYear: [
          {
            year: data.yearSelect,
            value: NaN,
            description: "Born",
          },
        ],
      },
    ]);
    updateDBAdd(data);
    
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  //Sets the default selector value
  useEffect(() => setValue("yearSelect", new Date().getFullYear()), [setValue]);
  const currentYear = new Date().getFullYear();

  async function updateDBAdd(input: dataType) {
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
                type: "specificYear",
                period: {
                  create: {
                    value: NaN,
                    description: "",
                  },
                },
                specificYear: {
                  create: [
                    {
                      year: input.yearSelect,
                      value: NaN,
                      description: "Born",
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
    const response = await fetch("/api/post/graph", options);
    const data = await response.json();
    setEventId(data.event.slice(-1)[0].id);
    setSpecificYearId(data.event.slice(-1)[0].specificYear.slice(-1)[0].id);
  }

  return (
    <form
      className={`${styles.container} ${pangolin.className}`}
      onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.formLabel}>When were you born?</label>
      <Controller
        name="yearSelect"
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Select
              onChange={onChange}
              reverse={true}
              start={1900}
              end={currentYear}
              defaultValue={currentYear}
            />
          );
        }}
      />
      {errors.yearSelect && (
        <p style={{ display: "inline", color: "red" }}>
          {errors.yearSelect.message as string}
        </p>
      )}
      <br />
      <input className={styles.button} type="submit" value="Start" />
    </form>
  );
}
