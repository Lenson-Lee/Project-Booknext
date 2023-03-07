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

  // // DB
  const book = await prisma.bookMemo.findMany({
    where: {
      userId: "tMJKJUa2JCW3udqE2Poz7ubrlyD2",
      isbn: target.isbn,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  //API -> search detail과 합칠 수 있을 것 같은데
  const request = await fetch(
    `
    http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${TTB}&itemIdType=${isbnType}&ItemId=${isbnID}&SearchTarget=Book&output=js&Version=20131101&Cover=Big
  `
  );
  const response = await request.json();

  console.log("target.isbn : ", target.isbn, "isbnID : ", isbnID);
  console.log(">mybook.get.detail --END");
  const apidata = response?.item[0];
  const mydata = book[0];

  const data = { apidata: apidata, mydata: mydata };
  return {
    data,
  };
}

/** 나의서재 장르 카운트 */
export async function getAllCategoryCount(target: any) {
  /** 전체기간 총 도서량 */
  const sum = await prisma.bookMemo.count({
    where: {
      userId: target.uid,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  /** 장르 카운트 ex: {만화 :5권}, {소설:3권} */
  const ctgcount = await prisma.bookMemo.groupBy({
    by: ["field"],
    _sum: {
      fieldcount: true,
    },
    orderBy: {
      _count: {
        fieldcount: "desc",
      },
    },
    where: {
      userId: target ? target.uid : "undefine",
      field: {
        notIn: [""],
      },
      state: {
        notIn: "wish",
      },
    },
    take: 5,
  });

  // console.log("🐭 총 독서 수 sum : ", sum);
  // console.log("🐹 총 카테고리 종류와 카운트 : ", ctgcount );
  const data = { sum: sum, ctgcount: ctgcount };
  return {
    data,
  };
}

/** 나의서재 장르 카운트(지만 목록 조회) */
export async function getMonthCount(target: any) {
  const getDate = (time: string) => {
    const now = new Date(new Date().setDate(1));
    const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
    const doubleMonth = new Date(now.setMonth(now.getMonth() - 2));

    if (time === "this") {
      return now;
    } else if (time === "last") {
      return lastMonth;
    } else if (time === "doubleLast") {
      return doubleMonth;
    }
  };

  /** 월별 기록활동 카운트 createAt으로 산정 */
  const thisMonthCnt = await prisma.memoList.findMany({
    where: {
      userId: target ? target.uid : "undefine",
      createdAt: {
        gte: getDate("this"),
      },
    },
  });
  const lastMonthCnt = await prisma.memoList.findMany({
    where: {
      userId: target ? target.uid : "undefine",
      createdAt: {
        gte: getDate("last"),
        lte: getDate("last"),
      },
    },
  });
  const doubleLastMonthCnt = await prisma.memoList.findMany({
    where: {
      userId: target ? target.uid : "undefine",
      createdAt: {
        gte: getDate("doubleLast"),
        lte: getDate("doubleLast"),
      },
    },
  });

  const data = {
    thisMonth: thisMonthCnt,
    lastMonth: lastMonthCnt,
    twolastMonth: doubleLastMonthCnt,
  };
  return data;
}
