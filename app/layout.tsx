import AuthModal from "../components/AuthModal";
import Header from "../components/Header";
import ContextProviders from "../lib/ContextProviders";
import "./globals.css";
import background from "../assets/modalBackground.jpg"

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
          <main className="min-h-screen w-screen max-w-full overflow-x-hidden bg-[url('../public/midjourney-3.png')] bg-center bg-no-repeat">
            <div className="mx-auto w-full h-auto max-w-7xl px-4">
              {children}
              {/* footer */}
            </div>
          </main>

          <AuthModal />
        </ContextProviders>
      </body>
    </html>
  );
}
