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
  //temp
  return (
    <html lang="en" data-theme="light">
      <head />
      <body>
        <ContextProviders>
          <main className="min-h-screen w-screen max-w-full overflow-x-hidden bg-[#f7d4c1aa]">
            <Header />
            <div className="mx-auto w-full h-auto max-w-6xl px-4">
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
