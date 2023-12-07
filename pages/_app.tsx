import type { AppProps } from "next/app";
import "../app/styles/globals.css";

import Header from "@/app/components/header";

interface CustomPageProps {}

export default function App({
  Component,
  pageProps,
}: AppProps<CustomPageProps>) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
