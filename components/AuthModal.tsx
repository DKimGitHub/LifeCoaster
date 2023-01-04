"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {usePathname} from 'next/navigation';

export default function AuthModal() {
  const [email, setEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const pathname = usePathname();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsError(false);
    const res = await signIn("email", { email, redirect: false, callbackURL: pathname });
    if (res?.ok) {
        setSuccess(true);
        setTempEmail(email);
        setEmail('');
    } 
    res?.error && setIsError(true);
  }
  function handleChange(e: any) {
    setEmail(e.target.value);
  }
  function modalChangeHandler (e: any) {
    setEmail('');
    setTempEmail('');
    setIsError(false);
    setSuccess(false);
  }

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" onChange={modalChangeHandler}/>
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative rounded-md" htmlFor="">
          <label
            htmlFor="my-modal-4"
            className="btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </label>
          <h1 className="pb-4 text-xl font-bold">Login</h1>
          <p className="mb-2">With magic email link:</p>
          <form onSubmit={handleSubmit}>
            <label className="label pb-1 text-gray-500">Email</label>
            <input
              required
              pattern="^\S+@\S+\.\S+$"
              className="input-bordered input input-sm mb-1 w-full max-w-xs"
              value={email}
              onChange={handleChange}
            />
            <br />
            {isError && <p className="text-xs pb-1 text-error">invalid email. try again.</p>}
            {isSuccess && <p className="text-xs pb-1 text-success">Magic signin link sent to {tempEmail}</p>}
            <input type="submit" value="send" className="btn-sm btn" />
            <br />
          </form>
        </label>
      </label>
    </>
  );
}
