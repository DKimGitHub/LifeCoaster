import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, FormState } from "../../../lib/types";

export default function CreateForm() {
  const { userInput, updateUserInput, graphId, yearBorn } = useContext(CreatePageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data: dataType) {
    const year: number = parseInt(data.yearInput);
    const value: number = parseInt(data.valueInput);
    if (userInput.find((item: dataType) => item.xValue === year) === undefined) {
      updateUserInput((prev) => [...prev, { xValue: year, yValue: value }]);
      const options = {
        method: "POST",
        body: JSON.stringify({
          data: {
            graph: {
              connect: {
                id: graphId,
              },
            },
            title: "some title",
            xValue: year,
            yValue: value,
          },
        }),
      };
    } else {
      alert("The year overlaps!");
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>How content were you when you were born?</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Year"
        {...register("yearInput", {
          required: "This is required",
          min: {
            value: yearBorn,
            message: `minimum value is ${yearBorn}`,
          },
          max: {
            value: 2023,
            message: "maximum year is 2023",
          },
        })}
      />
      {errors.yearInput && (
        <p style={{ display: "inline", color: "red" }}>
          {errors.yearInput.message as string}
        </p>
      )}
      <br />
      <label className={styles.label}>Value</label>
      <input
        className={styles.input}
        type="text"
        placeholder="value"
        {...register("valueInput", {
          required: "This is required",
          min: {
            value: -10,
            message: "minimum value is -10",
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
      <input className={styles.submit} type="submit" value="Submit" />
    </form>
  );
}
