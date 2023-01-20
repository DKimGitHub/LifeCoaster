"use client";

import { useServerInsertedHTML } from "next/navigation";
import { CssBaseline, globalCss } from "@nextui-org/react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { theme } from "../styles/createTheme"


const globalStyles = globalCss({
  li: { marginBottom: "0 !important" }
});

export default function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  globalStyles();
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>;
  });

  return (
    <>
      <NextThemesProvider
        attribute="class">
        <NextUIProvider theme={theme}>
          <SessionProvider>{children} </SessionProvider>
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}
