import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  console.log("넘어온 uid", req.body);
  const result = await prisma.bookMemo.findMany({
    where: {
      userId: "tMJKJUa2JCW3udqE2Poz7ubrlyD2",
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    // take: 6,
  });
  // console.log("GET완료, JSON에 들어가요옹");
  res.status(200).json({ result });
}
