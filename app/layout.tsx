import AuthModal from "../components/AuthModal";
import Header from "../components/Header";
import AuthContext from "../lib/AuthContext";
import { CssBaseline } from "@nextui-org/react";

import "./globals.css";
import NextUIContext from "../lib/NextUIContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head />
      <body>
        <NextUIContext>
        <AuthContext>
          <main className="min-h-screen w-screen max-w-full overflow-x-hidden">
            <Header />
            <div className="mx-auto w-full max-w-6xl px-4">
              {children}
              {/* footer */}
            </div>
          </main>
        </AuthContext>
        </NextUIContext>
        <AuthModal/>
      </body>
    </html>
  );
}
