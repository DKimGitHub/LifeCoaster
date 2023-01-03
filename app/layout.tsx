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
            <div className="sm:px-8 md:px-16 lg:px-36">
              {children}
              {/* footer */}
            </div>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
