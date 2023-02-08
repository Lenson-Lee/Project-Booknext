import ServiceLayout from "@/components/service_layout";
import { GoogleLoginBtn } from "@/components/Login/google_login_btn";
import { NextPage } from "next";
import { useAuth } from "@/contexts/auth_user.context";
import LoginButton from "@/components/Login/loginButton";
const JoinPage: NextPage = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <>
      <ServiceLayout>
        {/* <LoginButton /> next-auth 연습 */}
        <GoogleLoginBtn onClick={signInWithGoogle} />
      </ServiceLayout>
    </>
  );
};

export default JoinPage;
