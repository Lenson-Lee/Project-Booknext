import "../styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthUserProvider } from "@/contexts/auth_user.context";

import { QueryClientProvider, QueryClient } from "react-query";
import { useRef } from "react";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <>
      {/* pageProps 가 2개가 들어가있으면 GetStaticProps가 넘어가지 않는다. 일단 페이지 구성부터 하고, 문법을 찾아봐야 할 듯 */}
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClientRef.current}>
          <AuthUserProvider>
            <Component {...pageProps}></Component>
          </AuthUserProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
