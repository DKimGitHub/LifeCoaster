import Link from "next/link";
import AuthButtonHeader from "./AuthButtonHeader";

export default function Header() {
  return (
    <header className="navbar min-h-12 h-12 z-50 py-1 shadow-md">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex-1">
          <Link
            className="btn-ghost btn text-2xl normal-case"
            href="/">
            LifeCoaster
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal pr-4">
            <li>
              <Link
                href="/create"
                className="rounded-md text-xl font-bold leading-none ">
                create
              </Link>
            </li>
            <li>
              <Link
                href="/list"
                className="rounded-md text-xl font-bold leading-none">
                list
              </Link>
            </li>
          </ul>
          <AuthButtonHeader />
        </div>
      </div>
    </header>
  );
}
