import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-modal";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import { dataType } from "../../../lib/types";

import Slider from "../tools/ValueSlider";
import Select from "../tools/YearSelect";

import styles from "../../../styles/createPage/form.module.css";
import { customStyles } from "../../../styles/createPage/modalCustomStyle";

export default function SpecificYearQuestion() {
  const { setQuestionPageNum, setEvents } = useContext(CreatePageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function prevButtonClicked() {
    setQuestionPageNum(4);
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
        speicifEvents: [
          ...prev.slice(-1)[0].specificEvents,
          {
            year: data.yearSelect,
            value: data.valueSlider,
            description: data.description,
          },
        ],
      },
    ]);
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={prevButtonClicked}>
        Prev
      </button>
      <div className={styles.subContainer}>
        <p>Add specific events if there is any</p>
        <button onClick={addButtonClicked}>Add</button>
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
                <Select onChange={onChange} reverse={false} withinRange={true}/>
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
            <input
              name="description"
              type="text'"
              className={styles.descriptionText}
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
