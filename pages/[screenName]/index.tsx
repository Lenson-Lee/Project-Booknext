import MyBookList from "@/components/List/mybookList";
import ServiceLayout from "@/components/service_layout";
import { useAuth } from "@/contexts/auth_user.context";
import { NextPage } from "next";

const UserHomePage: NextPage = function () {
  const { authUser } = useAuth();
  return (
    <ServiceLayout>
      <div className="bg-white w-full">
        <section className="py-20 px-10">
          <MyBookList userData={authUser} />
        </section>
      </div>
    </ServiceLayout>
  );
};

export default UserHomePage;
