import "./styles/globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import Header from "./components/header";

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
    <html lang="en">
      <body className={GeistSans.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
