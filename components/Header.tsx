"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="navbar z-50 shadow-md">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">LifeCoaster</a>
      </div>
      <div className="flex-none">
        {session ? (
          <>
            <h1 className="pr-4">Signed in as {session?.user?.email} </h1>
            <button className="btn" onClick={() => signOut()}>
              logout
            </button>
          </>
        ) : (
          <>
            <h1 className="pr-4">Not signed in</h1>
            <button className="btn" onClick={() => signIn()}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
}
