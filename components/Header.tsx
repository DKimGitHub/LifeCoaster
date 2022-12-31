import AuthButtonHeader from "./AuthButtonHeader"

export default function Header() {

  return (
    <header className="navbar z-50 shadow-md py-3 pr-6 sm:px-8 md:px-16 lg:px-36">
      <div className="flex-1">
        <a className="btn-ghost btn text-3xl normal-case text-purple-900 hover:text-black" href="/">LifeCoaster</a>
      </div>
      <div className="flex-none">
      <ul className="menu menu-horizontal pr-4">
      <li><a href="/create" className="text-xl text-purple-900 font-bold rounded-md leading-none hover:text-black">create</a></li>
      <li><a href="/list" className="text-xl text-purple-900 font-bold rounded-md leading-none hover:text-black">list</a></li>
      </ul>
      <AuthButtonHeader/>
      </div>
    </header>
  );
}
