import React, { useContext } from "react";
import { CreateContext } from "../app/create/page";
import createStyles from "../styles/create.module.css";
import { useForm } from "react-hook-form";

export default function CreateForm() {
  const { userInput, updateUserInput } = useContext(CreateContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const year: number = parseInt(data.yearInput);
    const value: number = parseInt(data.valueInput);
    if (userInput.find((item) => item.year === year) === undefined) {
      updateUserInput((prev) => [...prev, { year: year, value: value }]);
    } else {
      alert("The year overlaps!");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={createStyles.formLabel}>Year</label>
      <input
        className={createStyles.formInput}
        type="text"
        placeholder="Year"
        {...register("yearInput", {
          required: "This is required",
          min: {
            value: 1995,
            message: "minimum year is 1995",
          },
          max: {
            value: 2023,
            message: "maximum year is 2023",
          },
        })}
      />
      {errors.yearInput && <p style={{display: 'inline', color:'red'}}>{errors.yearInput.message}</p>} 
      <br />
      <label className={createStyles.formLabel}>Value</label>
      <input
        className={createStyles.formInput}
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
      {errors.valueInput && <p style={{display: 'inline', color:'red'}}>{errors.valueInput.message}</p>}
      <br />
      <input className={createStyles.formSubmit} type="submit" value="Submit" />
    </form>
  );
}
