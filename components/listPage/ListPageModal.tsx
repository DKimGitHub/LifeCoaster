"use client";
import { Modal } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";

export default function ListPageModal({
  isModalOpen,
  setIsModalOpen,
  bindings,
  children,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
  children: React.ReactNode;
}) {
  const router = useRouter();
  const modalOnClose = () => {
    router.back();
    bindings.onClose();
  };
  return (
    <Modal
    className="cursor-default rounded"
      aria-labelledby="Post-Modal"
      open={bindings.open}
      onClose={modalOnClose}
    //   autoMargin={true}
      width={"80rem"}>
      {children}
    </Modal>
  );
}
