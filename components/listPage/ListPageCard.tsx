"use client";

import ListPageGraph from "./ListPageGraph";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import PostPage from "../PostPage";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import CommentIcon from "../../public/comment.svg";
import redHeartIcon from "../../public/heart_red.svg";
import outlineHeartIcon from "../../public/heart_outline.svg";
import { useSession } from "next-auth/react";
import { clsx } from "clsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
export default function ListPageCard({
  data,
  handleChange,
}: {
  data: any;
  handleChange: (post: any) => void;
}) {
  const { data: session, status } = useSession();
  const colorTheme = "light";
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function isHearted() {
    if (!session) return false;
    return data.usersWhoHearted.includes(session?.user?.email as string)
      ? true
      : false;
  }
  function clickHandler() {
    window.history.pushState(null, "Post 6", "/p/6");
    setIsModalOpen(true);
    router.prefetch("p/6");
  }
  function onModalClose() {
    router.back();
    setIsModalOpen(false);
  }
  function heartHandler() {
    //const toastContent = <label htmlFor="my-modal-4" >Login to heart posts!</label>
    if (!session) {
      toast.info("Login to heart posts!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const body = {
      email: session?.user?.email,
      postId: data?.id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch("/api/heart", options)
      .then((response) => response.json())
      .then((response) => {
        handleChange(response);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
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
          className="gradientBorder card card-compact rounded-sm border-2 border-solid bg-base-100  shadow-xl">
          <button
            onClick={clickHandler}
            className={` relative h-56 w-full bg-base-200`}>
            <ListPageGraph data={data?.graph?.nodes} />
          </button>

          <div className="flex items-center justify-between p-2">
            {" "}
            <div className="flex flex-1">
              <button
                className="btn"
                onClick={() => {
                  console.log(data);
                }}>
                test
              </button>
              <Image
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
              <p className="pr-1 text-xl font-medium">{data.numOfHearts}</p>
              <button
                onClick={heartHandler}
                className="flex items-center justify-center">
                <label
                  className={clsx(
                    "swap swap-flip",
                    isHearted() && "swap-active"
                  )}>
                  {/* {session && <input type="checkbox" />} */}
                  <Image
                    className={clsx("swap-off mr-2 inline")}
                    width={22}
                    height={22}
                    src={outlineHeartIcon}
                    alt="Heart"
                  />
                  <Image
                    className={clsx("swap-on mr-2 inline")}
                    width={22}
                    height={22}
                    src={redHeartIcon}
                    alt="Filled Heart"
                  />
                </label>
              </button>
              <p className="pr-1 text-xl font-medium">{data.comments.length}</p>
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
    </>
  );
}
