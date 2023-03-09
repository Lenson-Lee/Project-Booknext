import MyBookList from "@/components/List/mybookList";
import MyAllKeywordList from "@/components/List/myAllKeywordList";
import MyAllMemoList from "@/components/List/myAllMemoList";
import ServiceLayout from "@/components/service_layout";
import Chart from "@/components/Chart/Chart";
import BarChart from "@/components/Chart/BarChart";
import { useAuth } from "@/contexts/auth_user.context";
import {
  getAllKeywordList,
  getAllMemoList,
} from "@/pages/api/mymemo/mymemo.get";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import {
  getAllCategoryCount,
  getMonthCount,
} from "../api/mybook/mybook.get.detail";
interface Props {
  /** 키워드모음 */
  keywords: any;
  /** 메모모음 */
  memo: any;
  /** 차트를 위한 장르별 카운트 */
  count: any;
  /** 월별 기록활동 카운트(기록포함) */
  month: any;
}
function Mybook({ keywords, memo, count, month }: Props) {
  const { authUser } = useAuth();

  /** 키워드 총 모음 배열 */
  const [keywordList, setKeywordList] = useState<any>([]);
  /** 키워드 중복 제거 */
  const [uniqueKwList, setUniqueKwList] = useState<any>([]);
  /** 메모 총 모음 배열 */
  const [memoList, setMemoList] = useState<any>([]);

  const keywordata = JSON.parse(keywords);
  const memodata = JSON.parse(memo);
  const monthdata = JSON.parse(month);

  const monthMemocount =
    monthdata.thisMonth.length - monthdata.lastMonth.length;

  /** 중복키워드 제거 */
  useEffect(() => {
    const set: any = new Set(keywordList);
    const uniqueArr: any = [...set];
    setUniqueKwList(uniqueArr);
  }, [keywordList]);

  useEffect(() => {
    keywordata.map((item: any) => {
      const data = JSON.parse(item.keywords);
      data.map((i: any) => {
        setKeywordList((keyword: []) => [...keyword, i]);
      });
    });

    memodata.map((item: any) => {
      setMemoList((memoList: []) => [...memoList, item.content]);
    });
  }, []);
  return (
    <ServiceLayout>
      <p className="px-4 mt-10 mb-5 text-lg font-semibold">나의 서재</p>

      <div className="flex gap-x-4 mb-4">
        <div className="bg-white w-1/2 py-10 px-10 rounded-xl border">
          <div className="flex gap-x-5 items-end">
            <p className="text-xl font-semibold">많이 읽은 장르</p>
            <p className="text-gray-500 text-xs">
              다 읽은 책, 읽고있는 책 기준
            </p>
          </div>
          <div className="w-4/5 mx-auto mt-12 flex items-center">
            <Chart count={count.ctgcount} />
          </div>
        </div>
        <div className="bg-white w-1/2 h-fit py-10 px-10 rounded-xl border">
          <div className="flex gap-x-5 items-end">
            <p className="text-xl font-semibold">이달의 기록현황</p>
            {monthMemocount > 0 ? (
              <p className="text-gray-500 text-xs">
                지난달보다 기록활동이 {monthMemocount}% 증가했어요!
              </p>
            ) : null}
          </div>
          <div className="w-2/3 mx-auto mt-10">
            <BarChart count={monthdata} />
          </div>
        </div>
      </div>
      <div className="flex gap-x-4">
        <div className="bg-white w-full h-fit py-10 px-10 rounded-xl border">
          <MyBookList userData={authUser} />
        </div>
        <div className="w-1/3 space-y-4">
          <div className="h-fit p-10 bg-white rounded-xl border">
            <MyAllKeywordList keywordList={uniqueKwList} />
          </div>
          <div className="h-fit p-10 bg-white rounded-xl border">
            <MyAllMemoList memoList={memoList} />
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
}

// 사용자의 메모 데이터 조회
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const uid = context.query.uid;

  const keywords = await getAllKeywordList(uid);
  const kw = JSON.stringify(keywords.data.list);

  const memo = await getAllMemoList(uid);
  const mm = JSON.stringify(memo.data.list);

  const count = await getAllCategoryCount(uid);

  const month = await getMonthCount(uid);
  const mt = JSON.stringify(month);

  // console.log("💛🐰💛", month);
  return {
    props: { keywords: kw, memo: mm, count: count.data, month: mt },
  };
};

export default Mybook;
