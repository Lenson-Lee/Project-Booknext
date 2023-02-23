import ServiceLayout from "@/components/service_layout";
import BookInfo from "@/components/Info/BookInfo";
import { getBookDetail } from "@/pages/api/mybook/mybook.detail.get";
import { GetServerSideProps } from "next";

export type BookType = {
  data: object;
};

interface Props {
  apidata: any;
  // mydata: any;
}

//나의 서재 책 상세정보
function detailQuery({ apidata }: Props) {
  console.log("서버사이드 프롭스 했어요 넘어온 검색어 : ");
  console.log(apidata);
  // console.log("이것만할거에요", mydata);
  return (
    <ServiceLayout>
      <div className="bg-white w-full py-10 mt-20 rounded-xl">
        <div className="mx-20">
          <BookInfo state="mybook" data={apidata}></BookInfo>
        </div>
      </div>
    </ServiceLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const data = { isbn: query.isbn, isbn13: query.isbn13, title: query.detail };
  //알라딘 조회
  const result = await getBookDetail(data);

  console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ", result);

  return { props: { apidata: result.data } };
};
export default detailQuery;
