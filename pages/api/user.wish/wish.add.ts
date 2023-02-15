import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { uid, title, author, isbn, isbn13 } = JSON.parse(req.body);
  const document = await prisma.wishList.create({
    data: {
      uid: uid,
      title: title,
      author: author,
      isbn: isbn,
      isbn13: isbn13,
    },
  });

  console.log(document);
  res.status(200).json({ message: "포스트 끝났어용" });
}
