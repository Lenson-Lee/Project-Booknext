import Link from "next/link";

interface Props {
  data: any;
  state: any; // state = {나의서재 책 detail페이지 : mybook, 책 검색 상세페이지 : search}
}
async function response() {
  await fetch("/api/user.memo/memo.add", {
    method: "POST",
    body: "JSON.stringify(data)",
    headers: {
      Accept: "application / json",
    },
  });
}
const searchInfo = (
  <>
    <div className="flex gap-x-4">
      <button
        onClick={response}
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
      <button className="bg-yellow-300 text-white text-lg font-semibold px-4 py-2 flex gap-x-2 items-center rounded-xl">
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
  </>
);

const BookInfo = ({ data, state }: Props) => {
  return (
    <>
      <div className="flex gap-x-20">
        <img
          alt="책표지"
          src={data?.cover}
          className="object-cover object-center border bg-gray-100 w-56 mx-auto h-72"
        />
        <div className="w-4/5">
          <div className="h-4/5">
            <p className="text-xl font-semibold mb-4">{data?.title}</p>
            <p className="my-1 text-gray-500">{data?.categoryName}</p>
            <div className="flex items-center gap-x-4 divide-x-2 divide-gray-300 mb-5">
              <p>{data?.author}</p>
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
            <div className="line-clamp-3">{data?.description}</div>
            <Link
              href={data ? data?.link : ""}
              className="text-yellow-400 font-semibold text-sm cursor-pointer flex justify-end"
            >
              자세히 보기
            </Link>
          </div>
          {state === "search" ? searchInfo : null}
        </div>
      </div>
    </>
  );
};

export default BookInfo;
