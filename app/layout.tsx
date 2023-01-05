import Header from "../components/Header";
import AuthContext from "../lib/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthContext>
          <main className="min-h-screen w-screen max-w-full overflow-x-hidden">
            <Header />
            <div className="px-4 w-full max-w-6xl mx-auto">
              {children}
              {/* footer */}
            </div>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
