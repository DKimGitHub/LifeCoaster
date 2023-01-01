'use client'

import React, { useState } from "react";
import createStyles from "../../styles/create.module.css";
import Graph from "../../components/Graph";


export default function Page() {
  const [formOutput, setFormOutput] = useState([]);

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
		setFormOutput([formElements.yearInput.value, formElements.valueInput.value]);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 aspect-[21/5] w-full border border-black text-center">
        {`Year: ${formOutput[0]}, Value: ${formOutput[1]}`}
			<Graph/>
      </div>
      <div className={createStyles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label className={createStyles.formLabel}>Year</label>
          <input className={createStyles.formInput} id="yearInput" type="text" />
          <br />
          <label className={createStyles.formLabel}>Value</label>
          <input className={createStyles.formInput} id="valueInput" type="text" />
          <br />
          <input
            className={createStyles.formInput}
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}
