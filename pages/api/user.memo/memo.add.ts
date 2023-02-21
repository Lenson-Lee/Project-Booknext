import { PrismaClient } from "@prisma/client";
//express.js server
//api : server side

//여기는 메모 추가할때 update로 쓰고싶은디 현재 책 추가 자체를 사용중 변경예정

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
    },
  });

  console.log(document);
  res.status(200).json({ message: "포스트 끝났어용" });
}
