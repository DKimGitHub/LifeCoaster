"use client";

import { useServerInsertedHTML } from "next/navigation";
import { CssBaseline } from "@nextui-org/react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const lightTheme = createTheme({
  type: "light",
  theme: {
    // colors: {
    //  background: 'radial-gradient(circle, rgba(255,207,207,1) 0%, rgba(255,255,255,1) 100%)'
    //  }, // optional
 },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
     colors: {background: '$gray50'  }, // optional
  },
});
export default function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>;
  });

  return (
    <>
      <NextThemesProvider
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}>
        <NextUIProvider>
          <SessionProvider>{children} </SessionProvider>
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}
