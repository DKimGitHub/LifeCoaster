"use client";
import redHeartIcon from "../../public/heart_red.svg";
import outlineHeartIcon from "../../public/heart_outline.svg";
import Image from "next/image";
import CommentTextArea from "./CommentTextArea";
import PostPageGraph from "./PostPageGraph";
import { PostDataType } from "../../lib/types";
import { eventsToNodes, randomName, timeSince } from "../../lib/helpers";
import { useSession } from "next-auth/react";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
import { useTransition } from 'react';
import { clickHeart } from "../../lib/actions";

export default function PostPage({ postData }: { postData: PostDataType }) {
  const { data: session, status } = useSession();
  let [isPending, startTransition] = useTransition();
  function isHearted() {
    if (!session) return false;
    return postData?.usersWhoHearted.includes(session?.user?.email as string)
      ? true
      : false;
  }
  function heartHandler() {
    if (!session) {
      toast.info("Login to heart posts!", {
        containerId: "P",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    // const body = {
    //   email: session?.user?.email,
    //   postId: postData?.id,
    // };
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // };
    // fetch("/api/heart", options)
    //   .then((response) => response.json())
    //   .catch((error) => console.log(error));
    //   router.refresh();
    {/*@ts-expect-error*/ }
    return startTransition(() => clickHeart(session.user?.email, postData?.id));
  }


  return postData ? (
    <>
      <ToastContainer
        enableMultiContainer
        containerId={"P"}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        transition={Flip}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex flex-col md:flex-row">
        <PostPageGraph data={eventsToNodes(postData?.graph?.event)} />
        <div className="flex h-[calc(100vh-20rem)]  w-full flex-col justify-between overflow-y-auto md:h-[80vh] md:w-1/3">
          <div className="flex items-center justify-between p-2">
            {" "}
            <div className="flex flex-1 items-center">
              <Image
                height={46}
                width={46}
                src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${postData.user.name
                  }&radius=10`}
                alt="avatar"
              />{" "}
              <p className="px-3 text-lg font-semibold leading-6">
                {postData.user.name}
              </p>
              <p></p>
            </div>
            <div className="flex flex-none justify-center pr-2">
              <p className="pr-1 text-2xl">{postData.numOfHearts}</p>
              <button
                onClick={heartHandler}
                className="flex items-center justify-center">
                <label
                  className={clsx(
                    "swap swap-flip",
                    isHearted() && "swap-active"
                  )}>
                  <Image
                    className="swap-off inline"
                    width={24}
                    height={24}
                    src={outlineHeartIcon}
                    alt="Heart"
                  />
                  <Image
                    className="swap-on inline"
                    width={24}
                    height={24}
                    src={redHeartIcon}
                    alt="Filled Heart"
                  />
                </label>
              </button>
            </div>
          </div>
          {postData?.comments.length === 0 ? (
            <div className="flex h-full flex-col justify-end">
              <p className="flex justify-center pb-4 text-gray-400">
                Be the first to leave a comment!
              </p>
            </div>
          ) : (
            <div className="commentContainer flex flex-1 flex-col-reverse overflow-auto border-b border-t">
              {postData?.comments.map((comment, index) => (
                <div key={index} className="flex w-full px-3 py-[0.6rem]">
                  <Image
                    height={38}
                    width={38}
                    src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${comment.user?.email}&radius=50`}
                    alt="avatar"
                  />
                  <div className="flex h-max flex-col justify-start pl-3">
                    <div className="flex items-center">
                      <div className="pr-2 font-bold">{comment.user?.name}</div>
                      <div className="text-sm">
                        {typeof comment.createdAt === "string"
                          ? timeSince(new Date(comment.createdAt))
                          : timeSince(comment.createdAt)}
                      </div>
                    </div>
                    <div className="w-full text-left">{comment.text}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <CommentTextArea postId={postData.id as string} />
        </div>
      </div>
    </>
  ) : (
    <div>
      <p>empty like our mind</p>
    </div>
  );
}
