"use client";
import ListPageCard from "./ListPageCard";
import InfiniteScroll from "react-infinite-scroll-component";

import { useState } from "react";
import { Loading } from "@nextui-org/react";

export default function ListPageContent({
  listOfPosts,
}: {
  listOfPosts: string;
}) {
  const [posts, setPosts] = useState(JSON.parse(listOfPosts));
  const [hasMore, setHasMore] = useState(true);

  const getMorePosts = async () => {
    const res = await fetch(`/api/listPage?offset=${posts.length}`);
    const newPosts = await res.json();
    console.log(newPosts);
    newPosts.length === 0 ? setHasMore(false) :
    setPosts((post : any[]) => [...post, ...newPosts]);
  };

  return (
    <>
      <InfiniteScroll
      className="!overflow-visible"
        dataLength={posts.length}
        next={getMorePosts}
        hasMore={hasMore}
        loader={<div className="flex justify-center mb-10 mt-10"><Loading type="points" size="xl"/></div>}>
        <div className="mb-10 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
          {posts.map((post: any, index: number) => (
            <ListPageCard key={index} data={post} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
