import ServiceLayout from "@/components/service_layout";
import BookInfo from "@/components/Info/BookInfo";
import { getBookDetail } from "@/pages/api/mybook/mybook.detail.get";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
export type BookType = {
  data: object;
};

interface Props {
  data: any;
}

//나의 서재 책 상세정보
function detailQuery({ data }: Props) {
  const router = useRouter();
  const queries = router.query;

  const apidata = JSON.parse(data).apidata;
  const mydata = JSON.parse(data).mydata;
  useEffect(() => {
    if (!router.isReady) return;
    // console.log("🙆‍♀️ ISBN 있나요?", queries);
    // console.log("🙆‍♀️ apidata 있나요?", apidata);
    // console.log("🙆‍♀️ mydata 있나요?", mydata);
  }, [router.isReady]);

  return (
    <ServiceLayout>
      <div className="bg-white w-full py-10 mt-20 rounded-xl">
        <div className="mx-20">
          <BookInfo state="mybook" apidata={apidata} mydata={mydata}></BookInfo>
        </div>
      </div>
    </ServiceLayout>
  );
}

// mydata 넘어오는데 detail.get의 target이 새로고침하면 undefine이 잡혀서 오류?
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  /**MybookList >라우트에서 넘어온 쿼리 */
  const query = context.query;

  const data = {
    isbn: query?.isbn,
    isbn13: query?.isbn13,
  };

  //알라딘 조회
  const result = await getBookDetail(data);

  console.log(">[detail].tsx SSR -- END");
  return { props: { data: JSON.stringify(result.data) } };
};
export default detailQuery;
