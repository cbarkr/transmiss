import "./styles/globals.css";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const Header = dynamic(() => import("@/app/components/header"));

export const metadata: Metadata = {
  title: "Tranmiss",
  description: "", // TODO
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Header />
        <div className="flex flex-row justify-center">
          <div className="flex flex-col w-full mx-2 max-w-screen-sm">
            {/* TODO: Resolve "Received NaN for the children attribute" error */}
            {/* TODO: Try https://github.com/storybookjs/react-inspector/issues/42 */}
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
