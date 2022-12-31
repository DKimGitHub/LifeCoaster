import Header from "../components/Header";
import AuthContext from "./AuthContext";
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
        <Header/>
          <div className="flex w-full flex-col items-center">
            <div className="m-4 max-w-full rounded-xl border bg-blue-200 bg-gradient-to-br from-yellow-200 p-10 text-center text-7xl font-bold text-gray-700 ">
              Project by Kimbros
            </div>
            {children}
            {/* footer */}
          </div>
          </AuthContext>
      </body>
    </html>
  );
}
