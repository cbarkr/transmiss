import type { AppProps } from "next/app";
import '../app/styles/globals.css'

interface CustomPageProps {
}

export default function App({ Component, pageProps }: AppProps<CustomPageProps>) {
    return <Component { ...pageProps } />
}