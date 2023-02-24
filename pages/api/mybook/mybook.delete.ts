import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { id } = JSON.parse(req.body);

  const deleted = await prisma.bookMemo.delete({
    where: {
      id: id,
    },
  });
  console.log(deleted);
  res.status(200).json({ message: "삭제 끝났어용" });
}
