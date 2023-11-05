import "./styles/globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

import Header from "./components/header";

const lato = Lato({ subsets: ["latin"], weight: "400" });

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
      <body className={lato.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
