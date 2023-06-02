import AuthModal from "../components/AuthModal";
import Header from "../components/Header";
import ContextProviders from "../lib/ContextProviders";
import "./globals.css";
import styles from "../styles/mainPage.module.css";
import Navigation from "../components/Navigation";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "LifeCoaster",
  description: "Visualize the ups and downs of your life with LifeCoaster!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head />
      <body>
        <ContextProviders>
          <div>
            <main
              className={`min-h-screen w-screen max-w-full overflow-x-hidden bg-slate-100`}>

                {children}

            </main>
          </div>
          <AuthModal />
        </ContextProviders> 
        <Analytics />
      </body>
    </html>
  );
}
