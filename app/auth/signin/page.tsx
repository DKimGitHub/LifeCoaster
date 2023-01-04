import { getCsrfToken, getProviders } from "next-auth/react";
import Image from "next/image";
import styles from "./signin.module.css";
import SigninButton from "../../../components/SigninButton";

export default async function Signin() {
  const csrfToken = await getCsrfToken();

  return (
    <div className="relative overflow-hidden">
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          <Image
            src="/katalog_full.svg"
            width={96}
            height={64}
            alt="App Logo"
            className="h-20 mb-5"
          />
          <div className={styles.cardContent}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input placeholder="Email (Not Setup - Please Use Github)" />
            <button className={styles.primaryBtn}>Submit</button>
            <hr />
            {/* @ts-expect-error Server Component */}
            <SigninButton />
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image
        src="/login_pattern.svg"
        alt="Pattern Background"
        fill
        className={styles.styledPattern}
      />
    </div>
  );
}
