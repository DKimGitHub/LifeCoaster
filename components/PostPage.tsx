"use client";

import redHeartIcon from "../public/heart_red.svg";
import outlineHeartIcon from "../public/heart_outline.svg";
import PostPageGraph from "./PostPageGraph";
import Image from "next/image";

export default function PostPage() {
  const colorTheme = "cupcake";
  return (
    <>
      <div className="flex h-full items-center">
        <div
          data-theme={colorTheme}
          className={`chartContainer peer relative h-96 w-2/3 border-4 border-solid bg-base-100`}>
          <PostPageGraph />
        </div>
        <div className="flex w-1/3 flex-col">
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
        </div>
      </div>
    </>
  );
}
