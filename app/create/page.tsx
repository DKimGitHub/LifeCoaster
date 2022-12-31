import React from "react";
import createStyles from "../../styles/create.module.css"

/*function handleSubmit (event: React.SyntheticEvent<HTMLFormElement>) {
	event.preventDefault();
	const form = event.currentTarget;
	const formElements = form.elements;
}*/

export default async function Page() {
  return (
    <div className="flex flex-col items-center bg-red-500">
      <div className="mt-10 aspect-[21/5] w-full border border-black text-center">
        GRAPH
      </div>
      <div className={createStyles.formContainer}>
        <form>
			  	<label className={createStyles.formLabel}>Year</label>
					<input className={createStyles.formInput} type="text"/><br/>
					<label className={createStyles.formLabel}>Value</label>
					<input className={createStyles.formInput} type="text"/><br/>
					<input className={createStyles.formInput} type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  );
}
