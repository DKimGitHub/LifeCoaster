import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { dataType, DOBType } from "../lib/types";
import { CreatePageContext } from "../lib/CreatePageContext";
import createStyles from "../styles/create.module.css";

function CreatePageAgeModal() {
  const { updateFirstNode, updateisAgeModalOpen, updateUserInput } = useContext(CreatePageContext);

  function onSubmit(data: dataType) {
    const dateArray = data.dateInput.split("-");
    updateFirstNode({
      dateOfBirth: {
        year: parseInt(dateArray[0]),
        month: parseInt(dateArray[1]),
        day: parseInt(dateArray[2]),
      },
      value: parseInt(data.valueInput),
    });
    updateUserInput((prev) => [
      ...prev,
      { xValue: parseInt(dateArray[0]), yValue: parseInt(data.valueInput)},
    ])
    updateisAgeModalOpen(false);
  }

  async function createNode(){

  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={createStyles.formLabel}>When were you born?</label>
      <input
        className={createStyles.formInput}
        type="date"
        placeholder="Date"
        {...register("dateInput", {
          required: "This is required",
          max: {
            value: "2023-01-15",
            message: "maximum date is 2023-01-15",
          },
        })}
      />
      {errors.dateInput && (
        <p style={{ display: "inline", color: "red" }}>
          {errors.dateInput.message as string}
        </p>
      )}
      <br />
      <label className={createStyles.formLabel}>Value</label>
      <input
        className={createStyles.formInput}
        type="text"
        placeholder="Value"
        {...register("valueInput", {
          required: "This is required",
          min: {
            value: -10,
            message: "minimum value is - 10",
          },
          max: {
            value: 10,
            message: "maximum value is 10",
          },
        })}
      />
      {errors.valueInput && (
        <p style={{ display: "inline", color: "red" }}>
          {errors.valueInput.message as string}
        </p>
      )}
      <br />
      <input className={createStyles.formSubmit} type="submit" value="Submit" />
    </form>
  );
}

export default CreatePageAgeModal;
