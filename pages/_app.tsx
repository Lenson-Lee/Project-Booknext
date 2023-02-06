import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthUserProvider } from "@/contexts/auth_user.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthUserProvider>
        <Component {...pageProps}></Component>
      </AuthUserProvider>
    </>
  );
}

export default MyApp;
