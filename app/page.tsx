"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="mx-auto flex h-screen w-full max-w-4xl flex-col items-center justify-center">
        <div className="grid p-2 rounded-3xl h-[32rem] w-full grid-cols-3 grid-rows-4 items-center justify-center justify-items-center gap-2">
          <div className="col-span-3 row-span-3 flex h-full w-full items-center justify-center rounded-2xl bg-yellow-500">
            <p className="text-center text-6xl md:text-9xl fade-list-item">LifeCoaster</p>
          </div>
          <Link className="h-full w-full fade-list-item animation-delay-1000" href="/create">
            <Button
              color="primary"
              auto
              css={{
                height: "100%",
                width: "100%",
                color: "black",
                fontSize: "1.5rem",
                "@sm": { fontSize: "4rem" },
              }}>
              Create
            </Button>
          </Link>
          <Link className="h-full w-full fade-list-item  animation-delay-1500" href="/list">
            <Button
              
              auto
              css={{
                height: "100%",
                width: "100%",
                color: "black",
                fontSize: "1.5rem",
                "@sm": { fontSize: "4rem" },
              }}>
              List
            </Button>
          </Link>

          <Button
            as="label"
            //@ts-expect-error
            htmlFor="my-modal-4"
            
            auto
            className="fade-list-item animation-delay-2000"
            css={{
              height: "100%",
              width: "100%",
              color: "black",
              fontSize: "1.5rem",
              "@sm": { fontSize: "4rem" },
            }}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
