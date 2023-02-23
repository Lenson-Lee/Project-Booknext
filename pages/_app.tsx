import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthUserProvider } from "@/contexts/auth_user.context";
import "slick-carousel/slick/slick.css";

function MyApp({ Component, pageProps: pageProps }: AppProps) {
  return (
    <>
      {/* pageProps 가 2개가 들어가있으면 GetStaticProps가 넘어가지 않는다. 일단 페이지 구성부터 하고, 문법을 찾아봐야 할 듯 */}
      {/* <SessionProvider session={session}> */}
      <AuthUserProvider>
        <Component {...pageProps}></Component>
      </AuthUserProvider>
      {/* </SessionProvider> */}
    </>
  );
}

export default MyApp;
