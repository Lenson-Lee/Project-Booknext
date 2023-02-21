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
          <div className="flex items-end mb-8">
            <div className="text-2xl font-bold mr-8">내가 저장한 책</div>
            <div className="text-lg font-bold mr-4">다 읽은 책</div>
            <div className="text-lg font-bold mr-4">읽고 있는 책</div>
            <div className="text-lg font-bold mr-4">찜한 책</div>
          </div>
          <MyBookList userData={authUser} />
        </section>
      </div>
    </ServiceLayout>
  );
};

export default UserHomePage;
