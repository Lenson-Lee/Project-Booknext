import { useAuth } from "@/contexts/auth_user.context";
import { InAuthUser } from "@/models/in_auth_user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  userData: InAuthUser | null;
}
const MyBookList = ({ userData }: Props) => {
  const [dataList, setDataList] = useState<[]>([]);
  const [state, setState] = useState<string>("finish");

  const { authUser } = useAuth();
  const router = useRouter();

  /** router.query를 받으면 시작하기 위한 코드 */
  useEffect(() => {
    if (!router.isReady) return;
    //screenName 쓸모없는뎅 url때문에 넘어오나?
    // console.log("🙆‍♀️ router.query.screenName : ", router.query.screenName);
  }, [router.isReady]);

  /** userData가 들어오면 시작
      userId 값에 따라 데이터 출력 **/
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
        setDataList(jsondata.result);
        return jsondata.result;
      })
      .catch(() => {
        console.log("실패해요ㅜㅜ");
      });
  }

  //📌userData 들어오면 그 때 돌릴게용
  useEffect(() => {
    if (userData && router.isReady) {
      getData();
    }
  }, [state, userData]);

  return (
    <>
      <div className="flex items-end mb-8">
        <div className="text-xl font-bold mr-8">내가 저장한 책</div>
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
            console.log("wish 클릭해용");
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
              pathname: `/${authUser?.email?.replace(
                "@gmail.com",
                ""
              )}/mybook/${book.title}`,
              query: {
                isbn: book.isbn,
                isbn13: book.isbn13 ? book.isbn13 : "null",
              },
            }}
            key={book.isbn + index}
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
