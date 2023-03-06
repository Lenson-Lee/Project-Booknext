import { GetServerSideProps, NextPage } from "next";
import { searchResult } from "../../api/search/search.result";
import ServiceLayout from "@/components/service_layout";
import Link from "next/link";

//[검색어] 를 받기 위해 getServerSideProps 사용
// url에 넘어온 쿼리를 받는 방식은 getStaticProps에서 hook(useRouter)을 사용할 수 없어 실패

interface Props {
  target: any; //동적 라우터를 통해 넘어온 검색값
  result: any; //검색 결과
}

function SearchQuery({ target, result }: Props) {
  console.log("클라이언트로 넘어온 검색어 : ", target);
  return (
    <ServiceLayout>
      <div className="flex my-8 text-xl font-bold items-start">
        <div className="text-yellow-400">{target}</div>
        <div className="">에 관한 검색결과입니다.</div>
      </div>
      <div className="grid grid-cols-5">
        {result?.map((book: any) => (
          <Link
            href={{
              pathname: "/search/" + target + "/detail",
              query: { data: JSON.stringify(book) },
            }}
            key={book.isbn}
            className=""
          >
            <img
              alt="책표지"
              src={book.cover}
              className="object-cover object-center border bg-gray-100 w-44 mx-auto h-60"
            ></img>
            <div className="w-44 mt-4 mx-auto">
              <div className="line-clamp-2 text-base line-clamp-1 font-semibold">
                {book.title}
              </div>
              <div className="line-clamp-1 text-sm line-clamp-1">
                {book.author}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ServiceLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const result = await searchResult(query.searchquery);

  // console.log("동적라우터로 넘어온 검색어 값(Server) : ");
  // console.log(query.searchquery);
  // console.log(result);
  return { props: { target: query.searchquery, result: result.data } };
};

export default SearchQuery;
