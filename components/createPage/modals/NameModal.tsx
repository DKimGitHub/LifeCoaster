import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { dataType, eventType } from "../../../lib/types";
import styles from "../../../styles/createPage/modal.module.css";
import Select from "../tools/YearSelect";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function NameModal({
  setModalPageNum,
  setName,
}: {
  setModalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<String>>;
}) {
  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  function onSubmit(data: dataType) {
    setModalPageNum(4);
    setName(data.text)
  }

  return (
    <form
      className={`${styles.container} ${pangolin.className}`}
      onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.formLabel}>What is your name?</label>
      <Controller
        name="text"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <input
              type="text"
              onChange={onChange}
              style={{backgroundColor: "#fcf8f0", width: "10rem"}}
            />
          );
        }}
      />
      <input className={styles.button} type="submit" value="Next" />
    </form>
  );
}
