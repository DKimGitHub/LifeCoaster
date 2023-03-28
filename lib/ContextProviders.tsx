"use client";

import { useServerInsertedHTML } from "next/navigation";
import { CssBaseline, globalCss } from "@nextui-org/react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {SSRProvider} from '@react-aria/ssr';

//import { theme } from "../styles/createTheme"


const globalStyles = globalCss({
  li: { marginBottom: "0 !important" }
});

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$yellow200',
      primaryLightHover: '$yellow300',
      primaryLightActive: '$yellow400',
      primaryLightContrast: '$yellow600',
      primary: '$yellow600',
      primaryBorder: '$yellow500',
      primaryBorderHover: '$yellow600',
      primarySolidHover: '$yellow700',
      primarySolidContrast: '$white',
      primaryShadow: '$yellow500',

      link: '#5E1DAD',
    },
    space: {},
    fonts: {}
  }
})

export default function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  globalStyles();

  return (
    <>
    <SSRProvider>
        <NextUIProvider theme={theme}>
          <SessionProvider>{children} </SessionProvider>
        </NextUIProvider>
      </SSRProvider>
    </>
  );
}
