import { getCsrfToken, getProviders } from "next-auth/react";
import Image from "next/image";
import styles from "./signin.module.css";
import SigninButton from "../../../components/SigninButton";

async function getData() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  return { providers, csrfToken };
}

export default async function Signin() {
  const { providers, csrfToken } = await getData();
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
            style={{ height: "85px", marginBottom: "20px" }}
          />
          <div className={styles.cardContent}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input placeholder="Email (Not Setup - Please Use Github)" />
             <button className={styles.primaryBtn}>Submit</button> 
            <hr />
            {providers &&
              Object.values(providers).map((provider) => {
                return <SigninButton provider={provider}/>
              }
                 
              )}
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
