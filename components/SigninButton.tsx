"use client";
import { getProviders, signIn } from "next-auth/react";



export default async function SigninButton(props: any) {
  const providers = await getProviders();
  if (!providers) return null;
  return (

    Object.values(providers).map((provider) => (
      <div key={provider.name} className="mb-0">
        <button onClick={() => signIn(provider.id)}>
          Sign in with {provider.name}
        </button>
      </div>
    ))
  );
}
