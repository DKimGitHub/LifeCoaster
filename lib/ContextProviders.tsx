"use client";

import { useServerInsertedHTML } from "next/navigation";
import { CssBaseline, globalCss } from "@nextui-org/react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SSRProvider } from "@react-aria/ssr";

import { theme } from "../styles/createTheme";

import { useSSR } from "@nextui-org/react";

const globalStyles = globalCss({
  li: { marginBottom: "0 !important" },
});

export default function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  globalStyles();
  const { isBrowser } = useSSR();

  return (
    isBrowser && (
      <>
        <SSRProvider>
          <NextUIProvider>
            <SessionProvider>{children} </SessionProvider>
          </NextUIProvider>
        </SSRProvider>
      </>
    )
  );
}
