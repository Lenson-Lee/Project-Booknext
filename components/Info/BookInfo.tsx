import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MybookDetail from "./MybookDetail";
import SearchInfo from "./SearchInfo";

const DatePicker = dynamic(() => import("@/components/DatePicker/DatePicker"));

interface Props {
  apidata: any; // 알라딘에서 긁은 데이터
  state: string; // state = {나의서재 책 detail페이지 : mybook, 책 검색 상세페이지 : search}
  mydata: any; //내가 저장한 책 정보 데이터
}

const BookInfo = ({ state, apidata, mydata }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [bookState, setBookState] = useState<string>("finish"); //  finish, reading
  const [score, setScore] = useState<number>(0);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const router = useRouter();

  const getStart = (target: any) => {
    console.log(target);
    setStart(target);
  };

  const getEnd = (target: any) => {
    console.log(target);
    setEnd(target);
  };

  // 삭제 이벤트 통신
  const deleteData = async (target: React.SyntheticEvent) => {
    const response = await fetch("/api/mybook/mybook.delete", {
      method: "delete",
      body: JSON.stringify(target),
      headers: {
        Accept: "application / json",
      },
    });
    console.log(response.json());
    return response;
  };

  // 수정이벤트 통신
  const updateData = async (target: React.SyntheticEvent) => {
    setOpen(false);
    const updatedata = {
      id: mydata.id,
      state: bookState,
      score: score ? score : 0,
      start: start ? start : null,
      end: end ? end : null,
    };
    const response = await fetch("/api/mybook/mybook.update", {
      method: "put",
      body: JSON.stringify(updatedata),
      headers: {
        Accept: "application / json",
      },
    });
    console.log(response.json());
    return response;
  };

  useEffect(() => {
    if (!router.isReady) return;
    //screenName 쓸모없는뎅 url때문에 넘어오나?
    console.log("🙆‍♀️ router.query.screenName : ", router.query.screenName);
  }, [router.isReady]);
  return (
    <>
      <div className="flex gap-x-20">
        <img
          alt="책표지"
          src={apidata?.cover}
          className="object-cover object-center border bg-gray-100 w-56 mx-auto h-72"
        />
        <div className="w-4/5 relative">
          {/* ❌중복되는 코드 정리해야겠죠 */}
          {open && (
            <div className="mt-4 bg-white border rounded-xl pt-8 pb-10 px-12 absolute top-5 right-0">
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
                <div className="flex text-sm gap-x-2">
                  <div className="flex items-center justify-center">
                    <DatePicker getStart={getStart} getEnd state="start" />
                    <p>부터</p>
                  </div>
                  {bookState === "finish" ? (
                    <div className="flex items-center justify-center">
                      <DatePicker getStart getEnd={getEnd} state="end" />
                      <p>까지</p>
                    </div>
                  ) : null}
                </div>
                <div className="flex gap-x-8 text-sm">
                  <p className="font-semibold">별점주기</p>
                  <div className="flex gap-x-1">ㅁ</div>
                </div>
                <button
                  onClick={() =>
                    updateData(mydata).then((data) => {
                      alert("수정되었었습니다.");
                      router.push(`/${router.query.screenName}`);
                    })
                  }
                  className="absolute right-0 bg-yellow-300 text-white px-5 py-1 rounded-lg text-sm"
                >
                  등록
                </button>
              </div>
            </div>
          )}
          {state === "mybook" ? (
            <div className="flex justify-end gap-x-4">
              <button
                onClick={(e) => {
                  setOpen(!open);
                }}
                className="text-gray-400 text-sm pr-4 mr-s border-r"
              >
                수정하기
              </button>
              <button
                onClick={(e) => {
                  deleteData(mydata).then((data) => {
                    alert("삭제되었습니다.");
                    router.push(`/${router.query.screenName}`);
                  });
                }}
                className="text-gray-400 text-sm"
              >
                삭제하기
              </button>
            </div>
          ) : null}
          <div className="h-4/5">
            <p className="text-xl font-semibold mb-4">{apidata?.title}</p>
            <p className="my-1 text-gray-500">{apidata?.categoryName}</p>
            <div className="flex items-center gap-x-4 divide-x-2 divide-gray-300 mb-5">
              <p>{apidata?.author}</p>
              <div className="pl-4 flex items-center">
                <p className="mr-3">평균평점</p>
                <div className="text-yellow-400 flex">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p> 3.4점</p>
                </div>
              </div>
            </div>
            <div className="line-clamp-3">{apidata?.description}</div>
            <Link
              href={apidata ? apidata?.link : ""}
              className="text-yellow-400 font-semibold text-sm cursor-pointer flex justify-end"
            >
              자세히 보기
            </Link>
          </div>
          {state === "search" ? <SearchInfo data={apidata} /> : null}
          {state === "mybook" ? <MybookDetail mydata={mydata} /> : null}
        </div>
      </div>
    </>
  );
};

export default BookInfo;
