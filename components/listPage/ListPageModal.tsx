"use client";
import { Modal } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";

export default function ListPageModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const modalOnClose = () => {
    router.back();
  };
  return (
    <Modal
    className="cursor-default rounded"
      aria-labelledby="Post-Modal"
      open
      onClose={modalOnClose}
    //   autoMargin={true}
      width={"80rem"}>
      {children}
    </Modal>
  );
}
