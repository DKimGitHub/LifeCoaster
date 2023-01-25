"use client";

import redHeartIcon from "../public/heart_red.svg";
import outlineHeartIcon from "../public/heart_outline.svg";
import PostPageGraph from "./PostPageGraph";
import Image from "next/image";
import { Textarea } from "@nextui-org/react";

export default function PostPage() {
  const colorTheme = "cupcake";
  const commentList = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <div className="flex h-full flex-col items-center md:flex-row">
        <div
          data-theme={colorTheme}
          className={`chartContainer peer relative h-[20rem] w-full border-4 border-solid bg-base-100 md:h-[30rem] md:w-2/3`}>
          <PostPageGraph />
        </div>
        <div className="flex h-[30rem] w-1/3 flex-col justify-between">
          <div className="flex items-center justify-between ">
            {" "}
            <div className="flex flex-1 items-center">
              <Image
                height={46}
                width={46}
                src="https://api.dicebear.com/5.x/fun-emoji/svg?seed=Ryan&radius=10"
                alt="avatar"
              />{" "}
                <p className="text-lg font-semibold leading-6 px-3">Johny g</p>
                <p>2022 Year</p>
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
          <div className="commentContainer flex-1 overflow-scroll border-t border-b">
            {commentList.map(() => (
              <div className="flex h-16 w-full py-2 px-3">
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
           <div className="">
            <Textarea className="" fullWidth placeholder="Comment" minRows={1} />
            </div>
        </div>
      </div>
    </>
  );
}
