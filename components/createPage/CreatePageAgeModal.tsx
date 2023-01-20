import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

import { CreatePageContext } from "../../lib/CreatePageContext";
import { dataType, DOBType } from "../../lib/types";
import styles from "../../styles/createPage/modal.module.css";
import {customStyles} from "../../styles/createPage/modalCustomStyle"

function CreatePageAgeModal(props: any) {
  const { updateIsAgeModalOpen, updateYearBorn } =
    useContext(CreatePageContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen)
  }, [props])

  function closeModal() {
    setIsModalOpen(false);
  }

  function onSubmit(data: dataType) {
    updateYearBorn(data.yearInput)
    setIsModalOpen(false);
    updateIsAgeModalOpen(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Age Modal"
      ariaHideApp={false}
      closeTimeoutMS={150}
      shouldCloseOnOverlayClick={false}
      style={customStyles}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.formLabel}>When were you born?</label>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Year"
          {...register("yearInput", {
            required: "This is required",
            max: {
              value: "2023",
              message: "maximum date is 2023-01-15",
            },
          })}
        />
        {errors.dateInput && (
          <p style={{ display: "inline", color: "red" }}>
            {errors.dateInput.message as string}
          </p>
        )}
        <br />
        <input className={styles.button} type="submit" value="Next" />
      </form>
    </Modal>
  );
}

export default CreatePageAgeModal;
