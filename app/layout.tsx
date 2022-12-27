import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="flex w-full flex-col items-center">
          <div className="m-5 max-w-full rounded-3xl border bg-blue-200 bg-gradient-to-br from-yellow-200 p-10 text-center text-7xl font-bold text-gray-700 ">
            Project by Kimbros
          </div>
          <div className="flex w-full items-center justify-evenly">
            <div className="space-x-5 rounded-3xl border bg-white p-6 text-center text-4xl text-red-900">
              hello world
            </div>
            <button className="btn-primary btn-circle btn mt-8 h-28 w-28 text-yellow-200">
              fking useless button
            </button>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">AMC projected price</div>
                <div className="stat-value">$500,000</div>
                <div className="stat-desc">literally on the moon</div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
