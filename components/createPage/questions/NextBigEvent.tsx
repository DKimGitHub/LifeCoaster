import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, FormState } from "../../../lib/types";
import Select from "../tools/YearSelect";
import "../../../styles/slider.css";

export default function CreateForm(props: any) {
  const { updateUserInput, graphId, nextBigEvent, updateNextBigEvent } =
    useContext(CreatePageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function onSubmit(data: dataType) {
    props.setIsNextBigEvent(false);
    props.setIsYearOverlay(true);
    props.setPrevBigEvent(nextBigEvent)
    updateNextBigEvent(parseInt(data.yearSelect))
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
        },
      }),
    };
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        When was your next big event?
      </label>
      <Controller
        name="yearSelect"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} />
        )}
      />
      {errors.yearSelect && (
        <p style={{ display: "inline", color: "red" }}>
          {errors.yearSelect.message as string}
        </p>
      )}
      <input className={styles.button} type="submit" value="Next" />
    </form>
  );
}
