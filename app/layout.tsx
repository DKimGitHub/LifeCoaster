"use client";

import AuthModal from "../components/AuthModal";
import Header from "../components/Header";
import ContextProviders from "../lib/ContextProviders";
import "./globals.css";
import styles from "../styles/mainPage.module.css";
import Navigation from "../components/Navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //test
  return (
    <html lang="en" data-theme="light">
      <head />
      <body>
        <ContextProviders>
          <div>
            <main
              style={{
                minHeight: "100vh",
                width: "100vw",
                maxWidth: "100%",
                overflowX: 'hidden',
              }}>
              <Navigation />
              <div style={{ height: "1000px" }}>
                {children}
                {/* footer */}
              </div>
            </main>
          </div>
          <AuthModal />
        </ContextProviders>
      </body>
    </html>
  );
}
