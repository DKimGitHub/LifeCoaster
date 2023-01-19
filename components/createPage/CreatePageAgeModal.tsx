import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

import { CreatePageContext } from "../../lib/CreatePageContext";
import { dataType, DOBType } from "../../lib/types";
import styles from "../../styles/createPage/ageModal.module.css";

function CreatePageAgeModal(props: any) {
  const { updateisAgeModalOpen, updateYearBorn } =
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
    updateisAgeModalOpen(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      marginX: "auto",
      maxWidth: "72rem",
      maxHeight: "36rem",
    },
    overlay: {
      backgroundColor: "hsla(0,0%,0%,0.3)",
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Age Modal"
      ariaHideApp={false}
      closeTimeoutMS={150}
      shouldCloseOnOverlayClick={false}
      style={customStyles}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>When were you born?</label>
        <input
          className={styles.input}
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
        <input className={styles.submit} type="submit" value="Next" />
      </form>
    </Modal>
  );
}

export default CreatePageAgeModal;
