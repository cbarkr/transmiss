import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import "../app/styles/globals.css";

const Header = dynamic(() => import("@/app/components/header"));
const StopSearch = dynamic(() => import("@/app/components/stop/stopSearch"));

interface CustomPageProps {}

export default function App({
  Component,
  pageProps,
}: AppProps<CustomPageProps>) {
  return (
    <>
      <Header />
      <StopSearch />
      <Component {...pageProps} />
    </>
  );
}
