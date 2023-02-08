import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthUserProvider } from "@/contexts/auth_user.context";

function MyApp({ Component, pageProps: { pageProps, session } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <AuthUserProvider>
          <Component {...pageProps}></Component>
        </AuthUserProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
