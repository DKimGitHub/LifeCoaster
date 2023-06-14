import prisma from "../../lib/prisma";
import ListPageContent from "../../components/listPage/ListPageContent";
import AuthButtonHeader from "../../components/AuthButtonHeader";
import backArrow from "../../public/rounded-square-left-direction-svgrepo-com.svg";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import { Suspense } from "react";
import { SkeletonCard } from "../../components/SkeletonCard";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});


export default function Layout({
    children, modal}: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {
  return (
    <div className={pangolin.className}>
      <Navigation/>
      <div className="absolute right-8 top-6">
        <AuthButtonHeader />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4">

      {children}
      </div>
      {modal}
    </div>
  );
}
