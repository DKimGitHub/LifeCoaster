"use client";

import ListPageGraph from "./ListPageGraph";
import Modal from "react-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import PostPage from "./PostPage";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import CommentIcon from "../public/comment.svg";
import HeartIcon from "../public/heart_outline.svg";
import { dataType } from "../lib/types"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    marginX: "auto",
    width: "90%",
    maxWidth: "72rem",
    maxHeight: "36rem",
  },
  overlay: {
    backgroundColor: "hsla(0,0%,0%,0.3)",
  },
};
//TODO disable scroll but keep scrollbar
export default function ListPageCard(props: dataType) {
  const colorTheme = "light";
  const router = useRouter();
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const data = props.data;

  function clickHandler() {
    window.history.pushState(null, "Post 6", "/p/6");
    setIsAgeModalOpen(true);
    router.prefetch("p/6");
  }
  function onModalClose() {
    router.back();
    setIsAgeModalOpen(false);
  }
  return (
    <>
      <Modal
        isOpen={isAgeModalOpen}
        onRequestClose={onModalClose}
        contentLabel="Post Modal"
        ariaHideApp={false}
        closeTimeoutMS={150}
        style={customStyles}>
        <PostPage />
      </Modal>{" "}
      <Tilt perspective={2000} tiltMaxAngleX={10} tiltMaxAngleY={10}>
        <div
          data-theme={colorTheme}
          className="gradientBorder card card-compact rounded-sm bg-base-100 shadow-xl border-2  border-solid">
          <button
            onClick={clickHandler}
            className={` relative h-56 w-full bg-base-200`}>
            <ListPageGraph data = {data}/>
          </button>

          <div className="flex items-center justify-between p-2">
            {" "}
            <div className="flex flex-1">
              <img
                height={46}
                width={46}
                src="https://api.dicebear.com/5.x/fun-emoji/svg?seed=Ryan&radius=10"
                alt="avatar"
              />{" "}
              <div className="flex flex-col pl-2">
                <p className="text-lg font-semibold leading-6">Johnyg</p>
                <p>2022 Year</p>
              </div>
            </div>
            <div className="flex flex-none items-center">
              <p className="pr-1 text-xl font-medium">2</p>
              <Image
                className="mr-2 inline"
                width={22}
                height={22}
                src={HeartIcon}
                alt="Heart Icon"
              />
              <p className="pr-1 text-xl font-medium">6</p>
              <Image
                className="mr-1 inline"
                width={20}
                height={20}
                src={CommentIcon}
                alt="Comment Icon"
              />
            </div>
          </div>
        </div>
      </Tilt>
      {/* <div
          className={`absolute top-0 z-[-1] flex w-full rounded-t-md bg-accent px-2 text-accent-content transition-transform duration-300 ease-in-out peer-hover:-translate-y-4 `}>
          <div className="flex-1">John Smith</div>{" "}
          <div className="flex-none">{"   "} 3 hearts</div>
        </div> */}
    </>
  );
}
