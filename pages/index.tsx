import ServiceLayout from "@/components/service_layout";
import type { GetStaticProps } from "next";
import { GoogleAuthProvider } from "firebase/auth";
import { getBookList } from "./api/book.list";
import BookListSlider from "@/components/List/bookListSlider";
import Head from "next/head";

const provider = new GoogleAuthProvider();

interface Props {
  ItemNewSpecial: {}; //주목할만한 신간
  Bestseller: {}; //베스트셀러
  ItemNewAll: {}; //신간 전체
  // ItemEditorChoice: {}; //편집자 추천 > 카테고리로만 조회 가능이 무슨 뜻?
}

function Home({ Bestseller, ItemNewSpecial, ItemNewAll }: Props) {
  return (
    <>
      <ServiceLayout>
        <div className="mb-20">
          <BookListSlider data={Bestseller} title={"베스트셀러"} />
        </div>
        <div className="mb-20">
          <BookListSlider data={ItemNewSpecial} title={"주목할만한 신간"} />
        </div>
        <div className="mb-20">
          <BookListSlider data={ItemNewAll} title={"신간 전체"} />
        </div>
      </ServiceLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const ItemNewSpecial = await getBookList("ItemNewSpecial");
  const Bestseller = await getBookList("Bestseller");
  const ItemNewAll = await getBookList("ItemNewAll");
  return {
    props: { ItemNewSpecial, Bestseller, ItemNewAll },
  };
};
export default Home;
