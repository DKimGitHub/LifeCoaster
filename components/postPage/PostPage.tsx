"use client";
import redHeartIcon from "../../public/heart_red.svg";
import outlineHeartIcon from "../../public/heart_outline.svg";
import Image from "next/image";
import CommentTextArea from "./CommentTextArea";
import PostPageGraph from "./PostPageGraph";
import { PostDataType } from "../../lib/types";
import { eventsToNodes, timeSince } from "../../lib/helpers";

export default function PostPage({ postData } : { postData: PostDataType }) {
  return ( postData ? 
    <>
      <div className="flex flex-col md:flex-row">
        <PostPageGraph data={eventsToNodes(postData?.graph?.event)} />
        <div className="flex h-[calc(100vh-20rem)]  w-full flex-col justify-between overflow-y-auto md:h-[80vh] md:w-1/3">
          <div className="flex items-center justify-between p-2">
            {" "}
            <div className="flex flex-1 items-center">
              <Image
                height={46}
                width={46}
                src="https://api.dicebear.com/5.x/fun-emoji/svg?seed=Ryan&radius=10"
                alt="avatar"
              />{" "}
              <p className="px-3 text-lg font-semibold leading-6">Gerald</p>
              <p></p>
            </div>
            <div className="flex flex-none justify-center pr-2">
              <p className="pr-1 text-2xl">{postData.numOfHearts}</p>
              <label className="swap swap-flip">
                <input type="checkbox" />
                <Image
                  className="swap-off"
                  width={24}
                  height={24}
                  src={outlineHeartIcon}
                  alt="Heart"
                />
                <Image
                  className="swap-on"
                  width={24}
                  height={24}
                  src={redHeartIcon}
                  alt="Filled Heart"
                />
              </label>
            </div>
          </div>
          {postData?.comments.length === 0 ? (
            <div className="flex h-full flex-col">
              <p className="flex justify-center pt-5 text-gray-400">
                Be the first to leave a comment!
              </p>
            </div>
          ) : (
            <div className="commentContainer flex flex-1 flex-col-reverse overflow-auto border-t border-b">
              {postData?.comments.map((comment, index) => (
                
                <div key={index} className="flex w-full py-[0.6rem] px-3">
                  <Image
                    height={38}
                    width={38}
                    src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${comment.user?.email}&radius=50`}
                    alt="avatar"
                  />
                  <div className="flex h-max flex-col justify-start pl-3">
                    <div className="flex items-center">
                      <div className="pr-2 font-bold">ryan kim</div>{" "}
                      <div className="text-sm">{timeSince(comment.createdAt)}</div>
                    </div>
                    <div className="w-full text-left">{comment.text}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <CommentTextArea postId={postData.id as string}/>
        </div>
      </div>
    </>
    : <div><p>empty like our mind</p></div>
  );
}
