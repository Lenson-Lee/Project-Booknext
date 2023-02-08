import ServiceLayout from "@/components/service_layout";
import type { GetServerSidePropsContext, GetStaticProps, NextPage } from "next";
import { GoogleLoginBtn } from "@/components/Login/google_login_btn";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import FirebaseClient from "@/models/firebase_client";
import { useAuth } from "@/contexts/auth_user.context";
import axios from "axios";
import { useEffect, useState } from "react";
import { getBookList } from "./api/book.list";
const provider = new GoogleAuthProvider();

interface Props {
  data: {};
}

const Home: NextPage<Props> = ({ data }: Props) => {
  console.log(data);

  const { signInWithGoogle } = useAuth();
  const [sample, setSample] = useState({});

  return (
    <ServiceLayout>
      <GoogleLoginBtn onClick={signInWithGoogle} />
    </ServiceLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getBookList();
  return {
    props: { data },
  };
};
export default Home;
