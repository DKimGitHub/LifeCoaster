"use client";
import redHeartIcon from "../../public/heart_red.svg";
import outlineHeartIcon from "../../public/heart_outline.svg";
import Image from "next/image";
import CommentTextArea from "./CommentTextArea";
import PostPageGraph from "./PostPageGraph";
import { PostDataType } from "../../lib/types";

export default function PostPage({ postData } : { postData: PostDataType }) {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <PostPageGraph data={postData?.graph?.nodes} />
        <div className="flex h-[calc(100vh-20rem)]  w-full flex-col justify-between overflow-y-auto md:h-[80vh] md:w-1/3">
          <div className="flex items-center justify-between ">
            {" "}
            <div className="flex flex-1 items-center">
              <Image
                height={46}
                width={46}
                src="https://api.dicebear.com/5.x/fun-emoji/svg?seed=Ryan&radius=10"
                alt="avatar"
              />{" "}
              <p className="px-3 text-lg font-semibold leading-6">Johny g</p>
              <p></p>
            </div>
            <div className="flex flex-none justify-center">
              <p className="pr-1 text-2xl">10</p>
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
                Leave a Comment!
              </p>
            </div>
          ) : (
            <div className="commentContainer flex flex-1 flex-col-reverse overflow-auto border-t border-b">
              {postData?.comments.map((comment, index) => (
                <div key={index} className="flex h-16 w-full py-2 px-3">
                  <Image
                    height={36}
                    width={36}
                    src="https://api.dicebear.com/5.x/fun-emoji/svg?seed=aa&radius=50"
                    alt="avatar"
                  />
                  <div className="flex flex-col justify-start pl-2">
                    <div className="flex items-center">
                      <div className="pr-2 font-bold">ryan kim</div>{" "}
                      <div className="text-sm">2 days ago</div>
                    </div>
                    <div>this is a comment</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <CommentTextArea />
        </div>
      </div>
    </>
  );
}
