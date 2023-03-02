import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Props {
  data: any;
  mydata: any;
}

export default function List({ data, mydata }: Props) {
  return { data, mydata };
}

// uid와 isbn에 따른 메모 리스트 출력
export async function getMymemoList(target: any) {
  const list = await prisma.memoList.findMany({
    where: {
      userId: target.uid,
      isbn: target.isbn,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  console.log(">mymemo.get --END");

  const data = { list };
  return {
    data,
  };
}
