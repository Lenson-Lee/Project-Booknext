import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Props {
  data: any;
  mydata: any;
}

export default function List({ data, mydata }: Props) {
  return { data, mydata };
}

// 나의서재 책 상세정보
export async function getBookDetail(target: any) {
  const isbnType = target.isbn13 != "null" ? "ISBN13" : "ISBN";
  const isbnID = target.isbn13 != "null" ? target.isbn13 : target.isbn;
  const TTB = process.env.ALADIN_TTBKEY;
  //API
  const request = await fetch(
    `
    http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${TTB}&itemIdType=${isbnType}&ItemId=${isbnID}&SearchTarget=Book&output=js&Version=20131101&Cover=Big
  `
  );
  const response = await request.json();

  // // DB
  // const book = await prisma.bookMemo.findMany({
  //   where: {
  //     userId: "tMJKJUa2JCW3udqE2Poz7ubrlyD2",
  //     isbn: target.isbn,
  //   },
  //   orderBy: [
  //     {
  //       id: "desc",
  //     },
  //   ],
  // });

  const data = response?.item[0];
  // const mydata = book;
  return {
    data,
    // mydata,
  };
}
