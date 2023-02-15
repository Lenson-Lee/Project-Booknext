import { PrismaClient } from "@prisma/client";
//express.js server
//api : server side

//

//시간읽어서 1초전.. 서버시간...
//node.js에서 쓰는 mysql

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
  } = JSON.parse(req.body);
  const document = await prisma.bookMemo.create({
    data: {
      uid: uid,
      state: state,
      title: title,
      author: author,
      isbn: isbn,
      isbn13: isbn13,
      score: score,
      start: start,
      end: end,
      keywords: keywords,
      field: field,
    },
  });

  console.log(document);
  res.status(200).json({ message: "포스트 끝났어용" });
}
