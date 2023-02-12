import React, { useState, useContext, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-modal";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import { dataType, nodeType } from "../../../lib/types";

import Slider from "../tools/ValueSlider";
import Select from "../tools/YearSelect";

import styles from "../../../styles/createPage/form.module.css";
import { customStyles } from "../../../styles/createPage/modalCustomStyle";
import { emitKeypressEvents } from "readline";

export default function SpecificYearQuestion() {
  const {
    setQuestionPageNum,
    setEvents,
    events,
    setPhantomNodes,
    phantomNodes,
    setNodes,
    nodes,
  } = useContext(CreatePageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setValue("valueSlider", 0);
    setValue("yearSelect", events.slice(-2)[0].bigEvent);
  }, [setValue, events]);

  function closeModal() {
    setIsModalOpen(false);
  }

  function prevButtonClicked() {
    setQuestionPageNum(4);
    setEvents((prev) => [
      ...prev.slice(0, -1),
      { ...prev.slice(-1)[0], overallValue: NaN },
    ]);
    if (events.slice(-2)[0].bigEvent + 1 === events.slice(-1)[0].bigEvent) {
      setPhantomNodes((prev) => prev.slice(0, -1));
    } else {
      setPhantomNodes((prev) => prev.slice(0, -2));
    }
  }

  function nextButtonClicked() {
    setQuestionPageNum(2);
  }

  function addButtonClicked() {
    setIsModalOpen(true);
  }

  function onSubmit(data: dataType) {
    setEvents((prev) => [
      ...prev.slice(0, -1),
      {
        ...prev.slice(-1)[0],
        specificEvents: [
          ...prev.slice(-1)[0].specificEvents,
          {
            year: data.yearSelect,
            value: data.valueSlider,
            description: data.description,
          },
        ],
      },
    ]);
    setNodes((prev) => [
      ...prev,
      { xValue: data.yearSelect, yValue: data.valueSlider },
    ]);
    setIsModalOpen(false);
  }

  useEffect(() => {
    var specificYears: number[] = [];
    for (let item of events.slice(-1)[0].specificEvents) {
      specificYears.push(item.year);
      specificYears = specificYears.sort(function (a, b) {
        return a - b;
      });
    }

    if (events.slice(-2)[0].bigEvent === events.slice(-1)[0].bigEvent - 1) {
      if (events.slice(-2)[0].bigEvent === specificYears[0]) {
        setPhantomNodes((prev) => prev.slice(0, -1));
      }
    } else {
      var temp = events.slice(-2)[0].bigEvent;
      if (events.length === 2){
        temp ++;
      }

      let i = 0;
      while (temp === specificYears[i] && i < specificYears.length) {
        temp++;
        i++;
      }
      var firstYear = temp;
      temp = events.slice(-1)[0].bigEvent - 1;
      i = specificYears.length - 1;
      while (temp === specificYears[i] && i >= 0) {
        temp--;
        i--;
      }
      const secondYear = temp;
      if (firstYear === secondYear) {
        setPhantomNodes((prev) => [
          ...prev.slice(0, -2),
          {
            xValue: firstYear,
            yValue: events.slice(-1)[0].overallValue,
          },
        ]);
      } else if (firstYear > secondYear) {
        setPhantomNodes((prev) => prev.slice(0, -1));
      } else {
        setPhantomNodes((prev) => [
          ...prev.slice(0, -2),
          {
            xValue: firstYear,
            yValue: events.slice(-1)[0].overallValue,
          },
          {
            xValue: secondYear,
            yValue: events.slice(-1)[0].overallValue,
          },
        ]);
      }
    }
  }, [events, setPhantomNodes]);

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={prevButtonClicked}>
        Prev
      </button>
      <div className={styles.subContainer}>
        <p>Add specific years if there is any</p>
        <button onClick={addButtonClicked}>Add</button>
      </div>
      <div className={styles.subContainer}>
        <p>List of added years</p>
        {events.slice(-1)[0].specificEvents.map((item, key) => (
          <ul key={key}>
            <li>
              {`event #${key}`} {`year: ${item.year}`} {`value: ${item.value}`}
            </li>
          </ul>
        ))}
      </div>
      <button
        className={`${styles.button} ${styles.right}`}
        onClick={nextButtonClicked}>
        Next
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        ariaHideApp={false}
        closeTimeoutMS={150}
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.subContainer}>
            <label className={styles.label}>Specific year?</label>
            <Controller
              name="yearSelect"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  reverse={false}
                  start={events.slice(-2)[0].bigEvent}
                  end={events.slice(-1)[0].bigEvent - 1}
                />
              )}
            />
            {errors.yearSelect && (
              <p style={{ display: "inline", color: "red" }}>
                {errors.yearSelect.message as string}
              </p>
            )}
            <label className={styles.label}>Satisfactory level?</label>
            <Controller
              name="valueSlider"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Slider onChange={onChange} />
              )}
            />
            {errors.valueSlider && (
              <p style={{ display: "inline", color: "red" }}>
                {errors.valueSlider.message as string}
              </p>
            )}
          </div>
          <div className={styles.subContainer}></div>
          <div className={styles.subContainer}>
            <label className={styles.label}>Description?</label>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <textarea onChange={onChange} rows={4} cols={25} />
              )}
            />
            {errors.valueSlider && (
              <p style={{ display: "inline", color: "red" }}>
                {errors.valueSlider.message as string}
              </p>
            )}
          </div>
          <input
            className={`${styles.button} ${styles.right}`}
            type="submit"
            value="Add"
          />
        </form>
      </Modal>
    </div>
  );
}
