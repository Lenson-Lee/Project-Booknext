import MyBookList from "@/components/List/mybookList";
import ServiceLayout from "@/components/service_layout";
import { useAuth } from "@/contexts/auth_user.context";
import { NextPage } from "next";

const UserHomePage: NextPage = function () {
  const { authUser } = useAuth();
  return (
    <ServiceLayout>
      <div className="flex gap-x-4">
        <div className="bg-white w-full py-20 px-10 rounded-lg">
          <MyBookList userData={authUser} />
        </div>
        <div className="w-1/3 py-20 px-10 bg-white">
          <p className="text-lg font-semibold">내가 저장한 키워드</p>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default UserHomePage;
