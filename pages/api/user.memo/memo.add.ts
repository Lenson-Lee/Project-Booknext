import { PrismaClient } from "@prisma/client";
//express.js server
//api : server side

//

//시간읽어서 1초전.. 서버시간...
//node.js에서 쓰는 mysql

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const document = await prisma.BookMemo.create({
    data: {
      uid: "test",
      title: "test",
      author: "test",
      isbn: 123,
      isbn13: 123123123,
      state: "찜",
      score: 1,
    },
  });

  console.log(document);
  res.status(200).json({ message: "포스트 끝났어용" });
}
