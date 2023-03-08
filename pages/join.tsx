import ServiceLayout from "@/components/service_layout";
import { GoogleLoginBtn } from "@/components/Login/google_login_btn";
import { KakaoLoginBtn } from "@/components/Login/kakao_login_btn";
import { NextPage } from "next";
import { useAuth } from "@/contexts/auth_user.context";
import LoginButton from "@/components/Login/loginButton";

import { signIn, useSession, signOut } from "next-auth/react";

const JoinPage: NextPage = () => {
  const { signInWithGoogle } = useAuth();
  const { data: session } = useSession();
  if (session) {
    console.log(session.user);
  }
  return (
    <>
      <ServiceLayout>
        {/* <LoginButton /> next-auth 연습 */}
        <GoogleLoginBtn onClick={signInWithGoogle} />
        <KakaoLoginBtn
          onClick={() => {
            signIn("kakao");
          }}
        />
      </ServiceLayout>
    </>
  );
};

export default JoinPage;
