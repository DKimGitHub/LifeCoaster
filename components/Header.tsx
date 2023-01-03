import Link from "next/link";
import AuthButtonHeader from "./AuthButtonHeader"

export default function Header() {

  return (
    <header className="navbar z-50 shadow-md py-3 pr-6 sm:px-8 md:px-16 lg:px-36">
      <div className="flex-1">
        <Link className="btn-ghost btn text-3xl normal-case text-purple-900 hover:text-black" href="/">LifeCoaster</Link>
      </div>
      <div className="flex-none">
      <ul className="menu menu-horizontal pr-4">
      <li><Link href="/create" className="text-xl text-purple-900 font-bold rounded-md leading-none hover:text-black">create</Link></li>
      <li><Link href="/list" className="text-xl text-purple-900 font-bold rounded-md leading-none hover:text-black">list</Link></li>
      </ul>
      <AuthButtonHeader/>
      </div>
    </header>
  );
}
