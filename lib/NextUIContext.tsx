"use client";

import { NextUIProvider } from '@nextui-org/react'

export default function NextUIContext({ children }: {
  children: React.ReactNode;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}