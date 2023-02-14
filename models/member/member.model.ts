import FirebaseAdmin from "../firebase_admin";
import { InAuthUser } from "../in_auth_user";

const MEMBER_COL = "members";
const SCR_NAME_COL = "screen_names";

/** Promise 길어서 타입으로 뺐당 */
type AddResult =
  | { result: true; id: string }
  | { result: false; message: string };

async function add({
  uid,
  displayName,
  email,
  photoURL,
}: InAuthUser): Promise<AddResult> {
  try {
    const screenName = (email as string).replace("@gmail.com", "");
    const addResult =
      await FirebaseAdmin.getInstance().Firestore.runTransaction(
        async (transaction) => {
          const memberRef = FirebaseAdmin.getInstance()
            .Firestore.collection(MEMBER_COL)
            .doc(uid);
          const screenNameRef = FirebaseAdmin.getInstance()
            .Firestore.collection(SCR_NAME_COL)
            .doc(screenName);
          const memberDoc = await transaction.get(memberRef);
          if (memberDoc.exists) {
            // 이미 추가된 상태
            return false;
          }
          const addData = {
            uid,
            email,
            displayName: displayName ?? "",
            photoURL: photoURL ?? "",
          };
          await transaction.set(memberRef, addData);
          await transaction.set(screenNameRef, addData);
          return true;
        }
      );
    if (addResult === false) {
      return { result: true, id: uid };
    }
    return { result: true, id: uid };
  } catch (err) {
    console.error(err);
    /** server side쪽의 에러 */
    return { result: false, message: "서버에러" };
  }
}

/** 사용자 페이지 이동을 위한 정보 조회 **/
async function findByScreenName(
  screenName: string
): Promise<InAuthUser | null> {
  const memberRef = FirebaseAdmin.getInstance()
    .Firestore.collection(SCR_NAME_COL)
    .doc(screenName);
  const memberDoc = await memberRef.get();
  if (memberDoc.exists === false) {
    return null;
  }
  const data = memberDoc.data() as InAuthUser; //이미 타입캐스트가 되어있음
  return data;
}

const MemberModel = {
  add,
  findByScreenName,
};

export default MemberModel;
