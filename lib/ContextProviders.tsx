"use client";

import { useServerInsertedHTML } from "next/navigation";
import { CssBaseline } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function ContextProviders({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>;
  });

  return (
    <>
      <SessionProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>{" "}
    </>
  );
}
