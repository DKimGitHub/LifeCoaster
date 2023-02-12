import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType } from "../../../lib/types";
import Select from "../tools/YearSelect";

export default function NextBigEvent() {
  const { setQuestionPageNum, events, setEvents, setNodes } =
    useContext(CreatePageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("yearSelect", events.slice(-1)[0].bigEvent + 1);
  }, [setValue, events]);

  function prevButtonClicked() {
    if (events.length === 1) {
      setQuestionPageNum(1);
      setEvents((prev) => [{ ...prev[0], overallValue: NaN }]);
      setNodes((prev) => prev.slice(0, -1));
    } else {
      setQuestionPageNum(5);
      //delete events and nodes when the nodes are deleted from the graph.
    }
  }

  function onSubmit(data: dataType) {
    setQuestionPageNum(3);
    setEvents((prev) => [
      ...prev,
      { bigEvent: data.yearSelect, overallValue: NaN, specificEvents: [] },
    ]);
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={prevButtonClicked}>
        Prev
      </button>
      <div className={styles.subContainer}>
        <label className={styles.label}>When was your next big event?</label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "auto",
          }}>
          <p style={{ marginTop: "auto", marginBottom: "auto" }}>{`${
            events.slice(-1)[0].bigEvent
          } ~ `}</p>
          <Controller
            name="yearSelect"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                reverse={false}
                onChange={onChange}
                start={events.slice(-1)[0].bigEvent + 1}
                end={new Date().getFullYear()}
              />
            )}
          />
          {errors.yearSelect && (
            <p style={{ display: "inline", color: "red" }}>
              {errors.yearSelect.message as string}
            </p>
          )}
        </div>
      </div>
      <input
        className={`${styles.button} ${styles.right}`}
        type="submit"
        value="Next"
      />
    </form>
  );
}
