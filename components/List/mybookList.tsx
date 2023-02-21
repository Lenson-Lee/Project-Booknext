import { InAuthUser } from "@/models/in_auth_user";
import { useEffect, useState } from "react";

interface Props {
  userData: InAuthUser | null;
}
const MyBookList = ({ userData }: Props) => {
  const [dataList, setDataList] = useState();

  //userId 값에 따라 데이터 출력
  async function getData() {
    const userId = userData?.uid;

    const response = await fetch("/api/mybook/mybook.get", {
      method: "post",
      body: JSON.stringify(userId),
      headers: {
        Accept: "application / json",
      },
    })
      .then((res) => res.json())
      .then((jsondata) => {
        console.log(jsondata);
        setDataList(jsondata.result);
        return jsondata.result;
      })
      .catch(() => {
        console.log("실패해요ㅜㅜ");
      });
  }
  // ========================================================
  useEffect(() => {
    getData();
    console.log(dataList);
  }, []); //getData end =======================================
  return <></>;
};

export default MyBookList;
