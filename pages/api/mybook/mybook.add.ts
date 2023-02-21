import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const {
    uid,
    state,
    title,
    author,
    isbn,
    isbn13,
    score,
    start,
    end,
    keywords,
    field,
    cover,
  } = JSON.parse(req.body);
  const document = await prisma.bookMemo.create({
    data: {
      userId: uid,
      state: state,
      title: title,
      auth: author,
      isbn: isbn,
      isbn13: isbn13,
      score: score,
      start: start,
      end: end,
      keywords: keywords,
      field: field,
      cover: cover,
    },
  });

  console.log(document);
  res.status(200).json({ message: "포스트 끝났어용" });
}
