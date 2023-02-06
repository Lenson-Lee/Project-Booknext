import ServiceLayout from "@/components/service_layout";
import type { NextPage } from "next";
import { GoogleLoginBtn } from "@/components/Login/google_login_btn";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import FirebaseClient from "@/models/firebase_client";
import { useAuth } from "@/contexts/auth_user.context";

const provider = new GoogleAuthProvider();

const Home: NextPage = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <ServiceLayout>
      <GoogleLoginBtn onClick={signInWithGoogle} />
    </ServiceLayout>
  );
};

export default Home;
