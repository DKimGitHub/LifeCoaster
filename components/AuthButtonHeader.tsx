"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
export default function AuthButtonHeader() {
  const { data: session } = useSession();
  return session ? (
    <button className="btn" onClick={() => signOut()}>
      logout
    </button>
  ) : (
    <button className="btn" onClick={() => signIn()}>
      Login
    </button>
  );
}
