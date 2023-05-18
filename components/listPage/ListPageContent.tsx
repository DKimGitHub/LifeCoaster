"use client";
import ListPageCard from "./ListPageCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { Loading, useModal } from "@nextui-org/react";
import ListPageSorter from "./ListPageSorter";
import { ToastContainer, Flip } from "react-toastify";
import ListPageModal from "./ListPageModal";
import { PostDataType } from "../../lib/types";
import PostPage from "../postPage/PostPage";

enum sortByEnum {
  RU = "Recently Updated",
  RC = "Recently Created",
  MH = "Most Hearted",
}

export default function ListPageContent({
  listOfPosts,
}: {
  listOfPosts: PostDataType[];
}) {
  const [posts, setPosts] = useState(listOfPosts);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("Recently Created");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setVisible, bindings } = useModal();
  const [modalPostData, setModalPostData] = useState<PostDataType>(null);

  const getMorePosts = async () => {
    const enumType = Object.entries(sortByEnum).find(
      ([key, val]) => val === sortBy
    )?.[0];
    const res = await fetch(
      `/api/listPage?sortby=${enumType}&offset=${posts.length}`
    );
    const newPosts = await res.json();
    const curPosts = posts;
    newPosts.length === 0
      ? setHasMore(false)
      : setPosts((post) => [...post, ...newPosts]);
  };

  const sorterCallback = async (selection: string) => {
    setSortBy(selection);
    const enumType = Object.entries(sortByEnum).find(
      ([key, val]) => val === selection
    )?.[0];
    const res = await fetch(`/api/listPage?sortby=${enumType}&offset=0`);
    const newPosts = await res.json();
    setPosts(newPosts);
    setHasMore(true);
  };
  
  const cardCallback = (post: any) => {
    setPosts((prevPosts: any) =>
      prevPosts.map((p: any) =>
        p.id === post.id
          ? {
              ...p,
              usersWhoHearted: post.usersWhoHearted,
              numOfHearts: post.numOfHearts,
            }
          : p
      )
    );
  };

  return (
    <>
      <ToastContainer
           enableMultiContainer 
           containerId={'L'} 
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
      <div className="my-5 mt-8 flex w-full justify-center">
        <ListPageSorter handleSelect={sorterCallback} />
      </div>
      <InfiniteScroll
        className="!overflow-visible"
        dataLength={posts.length}
        next={getMorePosts}
        hasMore={hasMore}
        scrollThreshold="96px"
        loader={
          <div className="mb-10 mt-10 flex justify-center">
            <Loading type="points" size="xl" />
          </div>
        }>
        <div className="mb-10 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
          {posts.map((post: any) => (
            //eslint-disable-next-line
            <ListPageCard
              handleChange={cardCallback}
              setIsModalOpen={setVisible}
              setModalPostData={setModalPostData}
              data={post}
            />
          ))}
        </div>
      </InfiniteScroll>
      <ListPageModal
        bindings={bindings}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}>
        <PostPage postData={modalPostData} />
      </ListPageModal>
    </>
  );
}
