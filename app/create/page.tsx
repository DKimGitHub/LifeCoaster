'use client'

import React, { useState } from "react";
import createStyles from "../../styles/create.module.css";
import Graph from "../../components/Graph";
import { findAncestor } from "typescript";


export default function Page() {
  //const [formOutput, setFormOutput] = useState([]);
  const [userInput, setUserInput] = useState<Array<FormState>>([{year: 1995, value: 0}]);

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
    if (userInput.find(item => item.year === year) === undefined){
      setUserInput(prev => [...prev, {year: year, value: value}]);
    }
    else{
      alert("The year overlaps!");
    }
		
  }

  function formValidation 

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 aspect-[21/5] w-full border border-black text-center">
			<Graph data={userInput}/>
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
            className={createStyles.formSubmit}
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}
