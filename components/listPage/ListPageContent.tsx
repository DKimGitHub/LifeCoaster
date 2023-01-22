"use client";
import ListPageCard from "./ListPageCard";
import InfiniteScroll from "react-infinite-scroll-component";

import { useState } from "react";
import { Loading } from "@nextui-org/react";
import ListPageSorter from "./ListPageSorter";
import { ToastContainer, Flip } from "react-toastify";

enum sortByEnum {
  RU = "Recently Updated",
  RC = "Recently Created",
  MH = "Most Hearted",
}

export default function ListPageContent({
  listOfPosts,
}: {
  listOfPosts: string;
}) {
  const [posts, setPosts] = useState(JSON.parse(listOfPosts));
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("Recently Updated");

  const getMorePosts = async () => {
    const enumType = Object.entries(sortByEnum).find(
      ([key, val]) => val === sortBy
    )?.[0];

    const res = await fetch(
      `/api/listPage?sortby=${enumType}&offset=${posts.length}`
    );
    const newPosts = await res.json();
    newPosts.length === 0
      ? setHasMore(false)
      : setPosts((post: any[]) => [...post, ...newPosts]);
  };

  const callback = (selection: string) => {
    setSortBy(selection);
  };

  return (
    <>
      <ToastContainer
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
      <div className="my-5 flex w-full justify-end">
        <ListPageSorter handleSelect={callback} />
      </div>
      <InfiniteScroll
        className="!overflow-visible"
        dataLength={posts.length}
        next={getMorePosts}
        hasMore={hasMore}
        scrollThreshold="48px"
        loader={
          <div className="mb-10 mt-10 flex justify-center">
            <Loading type="points" size="xl" />
          </div>
        }>
        <div className="mb-10 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
          {posts.map((post: any, index: number) => (
            <ListPageCard key={index} data={post} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
