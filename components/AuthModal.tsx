"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState  } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import GoogleIcon from "../public/google_logo.svg";
import IGIcon from "../public/Instagram_logo_2022.svg";

export default function AuthModal() {
  // const { data: session, status } = useSession();

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
    popupCenter("/auth/google-signin", "LifeCoaster Login with Google");
  }
  function igHandler() {
    signIn("instagram");
  }

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

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
            className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </label>
          <h1 className="pt-8 pb-4 text-2xl font-bold">Login</h1>
          <p className="text-sm font-medium">With magic email link:</p>
          <form onSubmit={handleSubmit}>
            <label className="label pb-0 pl-0 text-xs text-gray-400">
              Email
            </label>
            <input
              required
              className="input-bordered input input-sm mb-1 w-full rounded-sm focus:outline-offset-0"
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
            <input
              type="submit"
              value={isLoading}
              className={`btn-primary btn-sm btn rounded-sm ${isDisabled}`}
            />
            <br />
          </form>

          <p className="pt-10 pb-3 text-sm font-medium">Or with account:</p>

          <button
            className="mb-1 flex w-full border p-3"
            onClick={googleHandler}>
            <Image height={16} width={16} src={GoogleIcon} alt="Google Logo" />
            <p className="pl-3 text-xs font-medium">Sign in with Google</p>
          </button>
          <button className="flex w-full border p-3" onClick={igHandler}>
            <Image height={16} width={16} src={IGIcon} alt="Instagram Logo" />
            <p className="pl-3 text-xs font-medium">Sign in with Instagram</p>
          </button>
        </label>
      </label>
    </>
  );
}
