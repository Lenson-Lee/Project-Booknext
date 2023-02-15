import { useAuth } from "@/contexts/auth_user.context";
import { useState, useRef, useEffect } from "react";

interface Props {
  data: any;
}
const SearchInfo = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [bookState, setBookState] = useState("finish"); //  finish, reading
  const [wish, setWish] = useState(""); //true일 경우 DB에 저장, false일 경우 삭제
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [keywords, setKeywords] = useState("");
  const authUser = useAuth();

  const uid = authUser.authUser?.uid ?? "undefine";
  const isbn13 = data?.isbn13 ? data.isbn13 : "undefine";
  // 데이터 전송
  async function response() {
    const postdata = {
      uid: uid,
      state: bookState,
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      isbn13: isbn13,
      score: score,
      start: start ? start : null,
      end: end ? end : null,
      keywords: keywords ? keywords : null,
      field: "",
    };
    await fetch("/api/user.memo/memo.add", {
      method: "POST",
      body: JSON.stringify(postdata),
      headers: {
        Accept: "application / json",
      },
    });
  }

  async function wishResponse() {
    const postWishdata = {
      uid: uid,
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      isbn13: isbn13,
    };
    await fetch("/api/user.wish/wish.add", {
      method: "POST",
      body: JSON.stringify(postWishdata),
      headers: {
        Accept: "application / json",
      },
    });
  }

  return (
    <div className="">
      <div className="flex gap-x-4">
        <button
          onClick={() => {
            wishResponse();
          }}
          className="bg-gray-100 text-gray-500 text-lg font-semibold px-4 py-2 flex gap-x-2 items-center rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>

          <p>찜하기</p>
        </button>
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="relative bg-yellow-300 text-white text-lg font-semibold px-4 py-2 flex gap-x-2 items-center rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          <p>내 서재에 추가</p>
        </button>
      </div>
      {open && (
        <div className="mt-4 bg-white border rounded-xl pt-8 pb-10 px-12 absolute">
          <div className="flex gap-x-10 text-sm mb-4">
            <button
              onClick={() => {
                setBookState("finish");
              }}
            >
              <div
                className={
                  (bookState === "finish" ? "bg-yellow-300 " : "") +
                  "w-2 h-2 rounded-full mx-auto mb-1"
                }
              />
              <p
                className={
                  bookState === "finish"
                    ? "text-black font-semibold"
                    : "text-gray-400 "
                }
              >
                다 읽은 책
              </p>
            </button>
            <button
              onClick={() => {
                setBookState("reading");
              }}
            >
              <div
                className={
                  (bookState === "reading" ? "bg-yellow-300 " : "") +
                  "w-2 h-2 rounded-full mx-auto mb-1"
                }
              />
              <p
                className={
                  bookState === "reading"
                    ? "text-black font-semibold"
                    : "text-gray-400 "
                }
              >
                읽고 있는 책
              </p>
            </button>
          </div>
          <div className="relative border-t pt-4 space-y-4 mb-6">
            <div className="flex gap-x-8 text-sm">
              <p className="font-semibold">기간설정</p>
              <div className="flex gap-x-2">
                <div>2023-01-10 부터</div>
                <div>2023-01-10 까지</div>
              </div>
            </div>
            <div className="flex gap-x-8 text-sm">
              <p className="font-semibold">별점주기</p>
              <div className="flex gap-x-1">ㅁ</div>
            </div>
            <button
              onClick={response}
              className="absolute right-0 bg-yellow-300 text-white px-5 py-1 rounded-lg text-sm"
            >
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchInfo;