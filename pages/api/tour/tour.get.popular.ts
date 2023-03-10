import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Props {
  data: any;
}

export default function List({ data }: Props) {
  return { data };
}

/** 유저들이 가장 많이 읽은 (state:wish 가 아닌 책) 책 */
export async function getMostPopularBook() {
  const book = await prisma.bookMemo.groupBy({
    by: ["title", "auth", "isbn", "isbn13"],
    _sum: {
      fieldcount: true,
    },
    orderBy: {
      _count: {
        fieldcount: "desc",
      },
    },
    where: {
      state: {
        notIn: "wish",
      },
    },
    take: 12,
  });

  const data = { popular: book };
  return {
    data,
  };
}

/** 유저들이 가장 많이 읽은 (state:wish 가 아닌 책) 책 */
//근데 이거 orderBy가 _avg순으로 하려면 어떻게 해야하는지 모르겠다
export async function getHighScoreBook() {
  const book = await prisma.bookMemo.groupBy({
    by: ["title", "auth", "isbn", "isbn13"],
    _avg: {
      score: true,
    },
    orderBy: {
      _count: {
        fieldcount: "desc",
      },
    },
    where: {
      state: {
        notIn: "wish",
      },
    },
    take: 12,
  });

  const data = { highscore: book };
  return {
    data,
  };
}
