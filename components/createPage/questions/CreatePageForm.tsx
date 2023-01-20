import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, FormState } from "../../../lib/types";
import FirstQuestion from "./FirstQuestion"

async function fetchData(api: string, options: dataType) {
  const response = await fetch(api, options);
  const data = await response.json();
  return data;
}

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
      fetchData("/api/post/node", options);
    } else {
      alert("The year overlaps!");
    }
  }

  return (
    <FirstQuestion/>
  );
}
