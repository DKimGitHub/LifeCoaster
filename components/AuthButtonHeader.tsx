"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";

export default function AuthButtonHeader() {
  const { data: session } = useSession();
  console.log(session);
  return !session ? (
    <label htmlFor="my-modal-4" className="btn-outline btn-primary btn ml-3 text-lg">
      Login
    </label>
  ) : (
    <Menu as="div" className="relative inline-block text-left ml-4">
        <Menu.Button className="w-12">
          <Image
            src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${session.user?.email}&radius=10`}
fill
            alt="avatar"
          /> 
        </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="z-10 absolute right-0 mt-7 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-primary text-primary-content" : "text-base-content"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>

                  My Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-primary text-primary-content" : "text-base-content"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                 
                  temp
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-error text-primary-content" : "text-base-content"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={()=>signOut()}
                  >
                 
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
