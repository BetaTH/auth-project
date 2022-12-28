import "../styles/global.css";
import type { AppProps } from "next/app";
import { AuthProvider, User } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider
      userData={pageProps?.userData ? (pageProps?.userData as User) : null}
    >
      <Component {...pageProps} />
    </AuthProvider>
  );
}
