import ServiceLayout from "@/components/service_layout";
import type { NextPage } from "next";
import { GoogleLoginBtn } from "@/components/Login/google_login_btn";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import FirebaseClient from "@/models/firebase_client";

// const provider = new GoogleAuthProvider();

const Home: NextPage = () => {
  // const { signInWithGoogle } = UseAuth();

  return (
    <ServiceLayout>
      {/* <GoogleLoginBtn onClick={signInWithGoogle} /> */}
    </ServiceLayout>
  );
};

export default Home;
