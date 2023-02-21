import { InAuthUser } from "@/models/in_auth_user";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  userData: InAuthUser | null;
}
const MyBookList = ({ userData }: Props) => {
  const [dataList, setDataList] = useState<[]>([]);
  const [state, setState] = useState("finish");

  //userId 값에 따라 데이터 출력
  //그런데 페이지 새로고침하면 uid 넘어가지 않아 mybook.get에서 uid 일단 고정시키고 작업
  async function getData() {
    const data = {
      state: state,
      userId: userData?.uid,
    };

    const response = await fetch("/api/mybook/mybook.get", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Accept: "application / json",
      },
    })
      .then((res) => res.json())
      .then((jsondata) => {
        console.log("mybookList fetch 결과", jsondata);
        setDataList(jsondata.result);
        return jsondata.result;
      })
      .catch(() => {
        console.log("실패해요ㅜㅜ");
      });
  }

  useEffect(() => {
    getData();
  }, [state]);
  return (
    <>
      <div className="flex items-end mb-8">
        <div className="text-2xl font-bold mr-8">내가 저장한 책</div>
        <button
          onClick={() => {
            setState("finish");
          }}
          className={
            (state === "finish"
              ? "text-yellow-400 font-bold "
              : "font-semibold ") + " text-lg mr-4"
          }
        >
          다 읽은 책
        </button>
        <button
          onClick={() => {
            setState("reading");
          }}
          className={
            (state === "reading"
              ? "text-yellow-400 font-bold "
              : "font-semibold ") + " text-lg mr-4"
          }
        >
          읽고 있는 책
        </button>
        <button
          onClick={() => {
            setState("wish");
          }}
          className={
            (state === "wish"
              ? "text-yellow-400 font-bold "
              : "font-semibold ") + " text-lg mr-4"
          }
        >
          찜한 책
        </button>
      </div>

      <div className="grid grid-cols-4">
        {dataList.map((book: any, index: number) => (
          <Link
            href={{
              pathname: "/search/" + book.title + "/detail",
              // query: { data: JSON.stringify(book) },
            }}
            key={book.title + index}
            className=""
          >
            <img
              alt="책표지"
              src={book.cover}
              className="object-cover object-center border bg-gray-100 w-44 mx-auto h-60"
            />
            <div className="w-44 mt-4 mx-auto">
              <div className="line-clamp-2 text-base line-clamp-1 font-semibold">
                {book.title}
              </div>
              <div className="line-clamp-1 text-sm line-clamp-1">
                {book.auth}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MyBookList;
