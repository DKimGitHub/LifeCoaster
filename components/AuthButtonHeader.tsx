"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import headerStyles from "../styles/header.module.css";

export default function AuthButtonHeader() {
  const { data: session } = useSession();
  return session ? (
    <button className={headerStyles.link} onClick={() => signOut()}>
      logout
    </button>
  ) : (
    <label htmlFor="my-modal-4" className="btn-primary btn-sm btn">
      Login
    </label>
  );
}
