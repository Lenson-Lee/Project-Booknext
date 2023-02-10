import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthUserProvider } from "@/contexts/auth_user.context";
import "slick-carousel/slick/slick.css";

interface customPageProps {}
function MyApp({ Component, pageProps: pageProps }: AppProps) {
  return (
    <>
      {/* <SessionProvider session={session}> */}
      <AuthUserProvider>
        <Component {...pageProps}></Component>
      </AuthUserProvider>
      {/* </SessionProvider> */}
    </>
  );
}

export default MyApp;
