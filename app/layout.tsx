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
        <div className="flex w-full flex-col items-center">
          <div className="m-5 max-w-full rounded-3xl border bg-blue-200 bg-gradient-to-br from-yellow-200 p-10 text-center text-7xl font-bold text-gray-700 ">
            Project by Kimbros
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
