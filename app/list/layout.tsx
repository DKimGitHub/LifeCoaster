import AuthButtonHeader from "../../components/AuthButtonHeader";
import Navigation from "../../components/Navigation";



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
