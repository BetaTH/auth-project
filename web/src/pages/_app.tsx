import "../styles/global.css";
import type { AppProps } from "next/app";
import { AuthProvider, User } from "../contexts/AuthContext";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider
      userData={pageProps?.userData ? (pageProps?.userData as User) : null}
    >
      <NextNProgress color="#432eb5" height={3} />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
