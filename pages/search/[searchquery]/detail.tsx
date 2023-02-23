import { GetServerSideProps } from "next";
import ServiceLayout from "@/components/service_layout";
import { useRouter } from "next/router";
import BookInfo from "@/components/Info/BookInfo";
import { searchData } from "@/pages/api/search.detail";
//[검색어] 를 받기 위해 getServerSideProps 사용
// url에 넘어온 쿼리를 받는 방식은 getStaticProps에서 hook(useRouter)을 사용할 수 없어 실패

export type BookType = {
  data: object;
};

interface Props {}

function SearchQuery() {
  const router = useRouter();
  const query = router.query; // 클릭한 책의 정보
  const data = query && query.data ? JSON.parse(query.data as string) : null;
  console.log("검색조회 detail의 데이터 : ", data);
  return (
    <ServiceLayout>
      <div className="bg-white w-full py-10 mt-20 rounded-xl">
        <div className="mx-20">
          <BookInfo state="search" data={data}></BookInfo>
        </div>
      </div>
    </ServiceLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  return { props: {} };
};
export default SearchQuery;
