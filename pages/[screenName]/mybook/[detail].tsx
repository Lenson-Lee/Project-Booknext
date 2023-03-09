import ServiceLayout from "@/components/service_layout";
import BookInfo from "@/components/Info/BookInfo";
import { getBookDetail } from "@/pages/api/mybook/mybook.get.detail";
import { getMymemoList } from "@/pages/api/mymemo/mymemo.get";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MyMemoList from "@/components/List/myMemoList";
export type BookType = {
  data: object;
};

interface Props {
  data: any;
  memodata: any;
}

//나의 서재 책 상세정보
function detailQuery({ data, memodata }: Props) {
  const router = useRouter();
  const queries = router.query;

  const apidata = JSON.parse(data).apidata;
  const mydata = JSON.parse(data).mydata;
  useEffect(() => {
    // console.log("🙆‍♀️ ISBN 있나요?", queries);
    // console.log("🙆‍♀️ apidata 있나요?", apidata);
    // console.log("🙆‍♀️ mydata 있나요?", mydata);
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <ServiceLayout>
      <div className="bg-white w-full py-10 mt-20 px-20 rounded-xl">
        <BookInfo state="mybook" apidata={apidata} mydata={mydata}></BookInfo>
      </div>
      <div className="bg-white w-full py-10 mt-10 px-20 rounded-xl">
        <MyMemoList apidata={apidata} memodata={memodata} />
      </div>
    </ServiceLayout>
  );
}

// mydata 넘어오는데 detail.get의 target이 새로고침하면 undefine이 잡혀서 오류 => Link as를 삭제하니 해결
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  /**MybookList >라우트에서 넘어온 쿼리 */
  const query = context.query;

  const data = {
    isbn: query?.isbn,
    isbn13: query?.isbn13,
  };

  /** uid, state 조회 */
  const result = await getBookDetail(data);
  const uid = result.data.mydata.userId;

  const userData = {
    uid: uid,
    isbn: query?.isbn,
  };

  /** 조회한 uid와 책 정보에 따라 메모리스트 조회 */
  const memoList = await getMymemoList(userData);
  console.log(memoList.data.list, "mybook.[detail]");

  console.log(">[detail].tsx SSR -- END");
  return {
    props: {
      data: JSON.stringify(result.data),
      memodata: JSON.stringify(memoList.data.list),
    },
  };
};
export default detailQuery;
