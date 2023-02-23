import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { userId, state } = JSON.parse(req.body);

  console.log(
    "👀넘어온 uid : ",
    userId,
    " 책 상태 : ",
    state,
    "--- mybook.get"
  );
  //
  if (state === "wish") {
    const result = await prisma.bookMemo.findMany({
      where: {
        userId: "tMJKJUa2JCW3udqE2Poz7ubrlyD2",
        state: "wish",
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
    res.status(200).json({ result });
    return;
  }
  //
  const result = await prisma.bookMemo.findMany({
    where: {
      userId: "tMJKJUa2JCW3udqE2Poz7ubrlyD2",
      state: state,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json({ result });
}
