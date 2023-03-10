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
