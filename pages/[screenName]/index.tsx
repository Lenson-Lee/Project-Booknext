import MyBookList from "@/components/List/mybookList";
import MyAllKeywordList from "@/components/List/myAllKeywordList";
import MyAllMemoList from "@/components/List/myAllMemoList";
import ServiceLayout from "@/components/service_layout";
import Chart from "@/components/Chart/Chart";
import { useAuth } from "@/contexts/auth_user.context";
import {
  getAllKeywordList,
  getAllMemoList,
} from "@/pages/api/mymemo/mymemo.get";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { getAllCategoryCount } from "../api/mybook/mybook.get.detail";

interface Props {
  keywords: any;
  memo: any;
  count: any;
}
function Mybook({ keywords, memo, count }: Props) {
  /** 키워드 총 모음 배열 */
  const [keywordList, setKeywordList] = useState<any>([]);
  /** 키워드 중복 제거 */
  const [uniqueKwList, setUniqueKwList] = useState<any>([]);

  /** 메모 총 모음 배열 */
  const [memoList, setMemoList] = useState<any>([]);

  const { authUser } = useAuth();

  const keywordata = JSON.parse(keywords);
  const memodata = JSON.parse(memo);

  // console.log("📗 키워드모음 : ", keywordata);
  // console.log("📒 메모모음 : ", memodata);

  console.log("차트를 위한 카운트 : ", count);
  console.log("📗 장르별 순위 : ", count.ctgcount);

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

      <div className="flex gap-x-4">
        <div className="bg-white w-1/2 h-fit grid grid-cols-2 py-10 px-10 rounded-xl border">
          <div className="">
            <p className="text-xl font-semibold">많이 읽은 장르</p>
          </div>
          <div>
            <Chart count={count.ctgcount} />
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
  console.log("💛🐰💛", count);
  return {
    props: { keywords: kw, memo: mm, count: count.data },
  };
};

export default Mybook;
