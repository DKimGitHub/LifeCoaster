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
            <main className="min-h-screen w-screen max-w-full overflow-x-hidden">
              {children}
              {/* footer */}
            </main>
          </div>
          <AuthModal />
        </ContextProviders>
      </body>
    </html>
  );
}
