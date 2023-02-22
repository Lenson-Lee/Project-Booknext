import ServiceLayout from "@/components/service_layout";
import BookInfo from "@/components/Info/BookInfo";
import { getBookDetail } from "@/pages/api/mybook/mybook.detail.get";
import { GetServerSideProps } from "next";

export type BookType = {
  data: object;
};

interface Props {
  result: any;
}

//나의 서재 책 상세정보
function detailQuery({ result }: Props) {
  console.log("클라이언트로 넘어온 검색어 : ");
  console.log(result);
  return (
    <ServiceLayout>
      <div className="bg-white w-full py-10 mt-20 rounded-xl">
        <div className="mx-20">
          <BookInfo state="mybook" data={result}></BookInfo>
        </div>
      </div>
    </ServiceLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const data = { isbn: query.isbn, isbn13: query.isbn13, title: query.detail };
  const result = await getBookDetail(data);

  return { props: { result: result.data } };
};
export default detailQuery;
