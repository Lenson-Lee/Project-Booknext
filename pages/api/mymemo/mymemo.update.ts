import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { id, isbn, isbn13, content, keywords } = JSON.parse(req.body);

  const document = await prisma.memoList.update({
    where: { id: id },
    data: { isbn, isbn13, content, keywords },
  });

  console.error("🤍메모가 수정되었습니다.", document);
  res.status(200).json({ message: "포스트 끝났어용" });
}
