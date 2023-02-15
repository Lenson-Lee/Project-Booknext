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

function SearchQuery() {
  const router = useRouter();
  const query = router.query; // 클릭한 책의 정보
  const data = query && query.data ? JSON.parse(query.data as string) : null;

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

// 바보냐? 고유식별 ISBN 받아서 어따쓴다고 ㅡㅡ 같은 장르 책 불러오고 싶다구~~
// export const getServerSideProps: GetServerSideProps<Props> = async ({
//   query,
// }) => {
//   const data = query && query.data ? JSON.parse(query.data as string) : null;
//   const categoryId = data.isbn13 ? data.isbn13 : data.isbn;
//   const result = await searchData(categoryId); //isbn 키로 유사 책 조회

//   return { props: { result: result } };
// };

export default SearchQuery;
