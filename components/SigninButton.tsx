"use client"
import { signIn } from "next-auth/react";

export default function SigninButton(props: any) {
  const { provider } = props;
  return (
    <div key={provider.name} style={{ marginBottom: 0 }}>
      <button onClick={() => signIn(provider.id)}>
        Sign in with {provider.name}
      </button>
    </div>
  );
}
