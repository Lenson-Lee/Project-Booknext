import { NextApiRequest, NextApiResponse } from "next";
import FirebaseAdmin from "@/models/firebase_admin";
import MemberModel from "@/models/member/member.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, email, displayName, photoURL } = req.body;
  if (uid === undefined || uid === null) {
    return res.status(400).json({ result: false, message: "uid가 없어요" });
  }
  if (email === undefined || email === null) {
    return res.status(400).json({ result: false, message: "email가 없어요" });
  }

  // addresult 과정은 성공했지만 screenName 과정에서 실패하면 전부 돌아가야함 > transaction
  const addResult = await MemberModel.add({
    uid,
    email,
    displayName,
    photoURL,
  });
  if (addResult.result === true) {
    return res.status(200).json(addResult);
  }
  res.status(500).json(addResult);
}
