"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
export default function AuthButtonHeader() {
  const { data: session } = useSession();
  return session ? (
    <>
      <div className="dropdown-bottom dropdown-end dropdown">
        <label tabIndex={0} className="btn">
          Me
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 mt-1 shadow"
        >
          <li>
          <Link href="/profile" className="btn btn-ghost">
              My Profile
            </Link>
          </li>
          <li>
            <button className="btn btn-ghost" onClick={() => signOut()}>
              logout
            </button>
          </li>
        </ul>
      </div>
    </>
  ) : (
<label htmlFor="my-modal-4" className="btn btn-primary">Login</label>

  );
}
