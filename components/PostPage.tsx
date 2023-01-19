"use client";

import redHeartIcon from "../public/heart_red.svg";
import outlineHeartIcon from "../public/heart_outline.svg";
import PostPageGraph from "./PostPageGraph";
import Image from "next/image";

export default function PostPage() {
  const colorTheme = "cupcake";
  return (
    <>
      <div className="flex flex-col md:flex-row h-full items-center">
        <div
          data-theme={colorTheme}
          className={`chartContainer peer relative h-96 w-full md:w-2/3 border-4 border-solid bg-base-100`}>
          <PostPageGraph />
        </div>
        <div className="flex w-1/3 flex-col justify-between">

        <div className="flex items-center justify-between p-2">
            {" "}
            <div className="flex flex-1">
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
          </div>
          
          <div className="flex justify-center">
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
          <div>comments...</div>
        </div>
      </div>
    </>
  );
}
