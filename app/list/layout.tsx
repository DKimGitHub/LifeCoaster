import prisma from "../../lib/prisma";
import ListPageContent from "../../components/listPage/ListPageContent";
import AuthButtonHeader from "../../components/AuthButtonHeader";
import backArrow from "../../public/rounded-square-left-direction-svgrepo-com.svg";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import { Suspense } from "react";
import { SkeletonCard } from "../../components/SkeletonCard";


export default function Layout({
    children}: {
    children: React.ReactNode;
  }) {
  return (
    <>
      <Navigation/>
      <div className="absolute right-8 top-6">
        <AuthButtonHeader />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4">

      {children}
      </div>
    </>
  );
}
