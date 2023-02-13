import { useAuth } from "@/contexts/auth_user.context";
import Link from "next/link";
import SearchBar from "../SearchBar/searchbar";

const navbar = function () {
  const { loading, authUser, signOut, signInWithGoogle } = useAuth();

  const logOutBtn = (
    <div className="flex gap-x-4 items-center">
      <button className="flex items-center gap-x-2">
        <img
          src={authUser?.photoURL ?? "https://bit.ly/broken-link"}
          className="w-10 h-10 rounded-full border"
        />
        <p className="font-semibold">
          {authUser?.displayName + "님" ?? "unknown"}
        </p>
      </button>
      <button
        className="border rounded-lg text-xs text-gray-600 px-2 py-1 h-fit cursor:pointer"
        onClick={signOut}
      >
        로그아웃
      </button>
    </div>
  );

  const logInBtn = (
    <>
      <button
        className="rounded-lg px-3 py-1 font-semibold bg-yellow-300 hover:bg-yellow-400 text-white"
        onClick={signInWithGoogle}
      >
        로그인
      </button>
      <Link
        href="/join"
        className="rounded-lg px-3 py-1 font-semibold bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-400"
      >
        회원가입
      </Link>
    </>
  );

  return (
    <div className="bg-white border-b">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-3 py-5">
        <Link
          href="/"
          className="font-dangam flex items-center justify-center text-center text-3xl font-semibold text-yellow-300 bg-yellow-50"
        >
          LOGO
        </Link>
        <div className="flex gap-x-16">
          <div className="text-lg font-semibold">나의 서재</div>
          <div className="text-lg font-semibold">책갈피</div>
        </div>
        <SearchBar />
        <div className="flex items-center gap-x-2">
          {loading || authUser === null ? logInBtn : logOutBtn}
          {/* <div className="border border-gray-300 rounded-lg px-3 py-1 font-semibold">
            회원가입
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default navbar;
