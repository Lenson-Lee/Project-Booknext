import { getYear, getMonth, getDate, getDay, parseISO } from "date-fns";

interface Props {
  mydata: any;
}

const MybookDetail = ({ mydata }: Props) => {
  console.log("👍 MybookDetail의 mydata : ", mydata);
  const state = () => {
    if (mydata.state === "wish") {
      return "찜한 책";
    } else if (mydata.state === "finish") {
      return "다 읽은 책";
    } else if (mydata.state === "reading") {
      return "읽고 있는 책";
    }
  };

  //요일찾기
  const findDay = (e: number) => {
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    return dayList[e];
  };

  const calcDay = (day: any) => {
    return (
      getYear(day) + "년 " + (getMonth(day) + 1) + "월 " + getDate(day) + "일 "
      // +
      // "(" +
      // findDay(getDay(day)) +
      // ")"
    );
  };

  return (
    <div className="bg-gray-50 text-gray-600 p-5 rounded-lg flex gap-x-10 ">
      <div className="">{state()}</div>
      <div className="flex  gap-x-3 items-center">
        <p className="">나의 별점</p>
        <div className="text-yellow-400 flex">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
          <p> 3.4점</p>
        </div>
      </div>
      <div className="flex  gap-x-3">
        <p className="">읽은 기간</p>
        <div className="flex gap-x-2">
          {mydata.start ? (
            <div>{calcDay(parseISO(mydata.start)) + " 부터"}</div>
          ) : (
            <div>정보가 없어요!</div>
          )}
          {mydata.end ? (
            <div>{calcDay(parseISO(mydata.end)) + " 까지"}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MybookDetail;
