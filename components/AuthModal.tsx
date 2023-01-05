"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AuthModal() {
  const [email, setEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState("send");
  const [isDisabled, setDisabled] = useState("btn-disabled");

  const pathname = usePathname();
  const re = /^\S+@\S+\.\S+$/;

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading("sending...");
    const res = await signIn("email", {
      email,
      redirect: false,
      callbackURL: pathname,
    });
    console.log(res);
    setLoading("send");
    if (res?.error) {
        setSuccess(false);
        setIsError(true);
      }
    if (res?.ok) {
      setIsError(false);
      setSuccess(true);
      setTempEmail(email);
      setEmail("");
    }

  }
  function handleChange(e: any) {
    setEmail(e.target.value);
    re.test(e.target.value) ? setDisabled("") : setDisabled("btn-disabled");
  }
  function modalChangeHandler(e: any) {
    setEmail("");
    setTempEmail("");
    setIsError(false);
    setSuccess(false);
  }

  function googleHandler() {
    signIn("google");
  }

  return (
    <>
      <input
        type="checkbox"
        id="my-modal-4"
        className="modal-toggle"
        onChange={modalChangeHandler}
      />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative rounded-md" htmlFor="">
          <label
            htmlFor="my-modal-4"
            className="btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </label>
          <h1 className="pt-8 pb-4 text-2xl font-bold">Login</h1>
          <p className="font-medium text-sm">With magic email link:</p>
          <form onSubmit={handleSubmit}>
            <label className="label pb-0 text-xs text-gray-400">Email</label>
            <input
              required
              className="input input-bordered input-sm border-gray-200 mb-1 w-full max-w-xs"
              value={email}
              onChange={handleChange}
            />
            <br />
            {isError && (
              <p className="pb-1 text-xs text-error">
                invalid email. try again.
              </p>
            )}
            {isSuccess && (
              <p className="pb-1 text-xs text-success">
                Magic signin link sent to {tempEmail} {`(check your spam)`}
              </p>
            )}
            <input type="submit" value={isLoading} className={`btn btn-sm btn-primary rounded-sm ${isDisabled}`} />
            <br />
          </form>

          <p className="pt-10 pb-4 text-sm font-medium">Or with account:</p>
          <button className="btn flex" onClick={googleHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"></path><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"></path><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"></path><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"></path></g></svg>
Sign in with Google
          </button>

        </label>
      </label>
    </>
  );
}
