// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//  파이어베이스 저장소에 멤버 추가
//  member.ctrl에서 자주 쓰이는 업무 수행
import { NextApiRequest, NextApiResponse } from "next";
import MemberModel from "@/models/member/member.model";
import MemberCtrl from "@/controllers/member.ctrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const supportMethod = ["POST"];
  try {
    if (supportMethod.indexOf(method!) === -1) {
      // 에러 반환
    }
    await MemberCtrl.add(req, res);
  } catch (err) {
    console.error(err);
    // 에러 처리
  }
}
