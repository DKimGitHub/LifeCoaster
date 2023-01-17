"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtonHeader() {
  const { data: session } = useSession();
  return session ? (
    <button onClick={() => signOut()}>
      logout
    </button>
  ) : (
    <label htmlFor="my-modal-4" className="btn-primary btn-sm btn">
      Login
    </label>
  );
}
