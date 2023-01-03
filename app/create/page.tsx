'use client'

import React, { useState } from "react";
import createStyles from "../../styles/create.module.css";
import Graph from "../../components/Graph";


export default function Page() {
  //const [formOutput, setFormOutput] = useState([]);
  const [data, setData] = useState<Array<FormState>>([]);

  interface FormState{
    year : number;
    value : number;
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const year : number = parseInt(formElements.yearInput.value);
    const value : number = parseInt(formElements.valueInput.value);
		setData(prevData => [...prevData, {year: year, value: value}]);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 aspect-[21/5] w-full border border-black text-center">
			<Graph data={data}/>
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
