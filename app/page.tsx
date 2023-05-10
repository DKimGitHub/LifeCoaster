"use client";
import { Button } from "@nextui-org/react";
import styles from "../styles/mainPage.module.css";

export default function Home() {
  return (
    <div className={styles.bodyBackground}>
      <p className="mt-2 text-5xl font-semibold">Build your own LifeCoaster!</p>
      <div style={{ marginTop: "3rem" }}></div>
      <Button bordered color="primary">
        start
      </Button>
    </div>
  );
}
