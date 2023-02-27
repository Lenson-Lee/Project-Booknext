import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { userId, isbn, isbn13, content, keywords } = JSON.parse(req.body);

  const document = await prisma.memoList.create({
    data: { userId, isbn, isbn13, content, keywords },
  });

  console.error("🤍서재에 저장되었습니다.", document);
  res.status(200).json({ message: "포스트 끝났어용" });
}
