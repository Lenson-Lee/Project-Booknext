import { useEffect, useState } from "react";

interface Props {
  apidata: any;
}
const MyMemoList = ({ apidata }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [keywordArr, setKeywordArr] = useState<any>([]);
  const [memo, setMemo] = useState<string>("");

  const { title, categoryName, author } = apidata;
  useEffect(() => {
    let arr: any = [];

    if (keywordInput.split(",").length > 0) {
      const word = keywordInput.split(",");

      word.forEach((element) => {
        /** 양끝 공백 제거 */
        let trim = element.trim();
        if (trim.length === 0) {
          //문자가 비어있음
          return;
        }
        arr.push(trim);
      });

      /** 중복값 제거 */
      const set: any = new Set(arr);
      const uniqueArr: any = [...set];

      setKeywordArr(uniqueArr);
    }
  }, [keywordInput]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-xl font-semibold">나의 기록</div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-yellow-300 hover:bg-yellow-400 text-white text-sm font-semibold rounded-lg px-4 py-1"
        >
          기록추가
        </button>
        {open && (
          <div className="fixed bg-black/25 left-0 right-0 top-0 h-screen">
            <div className="max-w-screen-lg mx-auto mt-44 bg-white border rounded-xl pt-16 pb-10 px-20">
              <div className="text-xl font-semibold">{title}</div>
              <div className="mt-2 flex gap-x-2">
                <div className="text-sm">{author}</div>
                <div className="text-sm">{categoryName}</div>
              </div>
              <div className="mt-5 flex gap-x-2 items-center text-sm">
                <label htmlFor="keyword">키워드 추가</label>
                <input
                  name="keyword"
                  onChange={(e) => {
                    setKeywordInput(e.currentTarget.value);
                  }}
                  className="border-b p-2 w-4/5 outline-none focus:border-yellow-400"
                  placeholder="키워드를 , 로 구분하여 입력해주세요 (ex : 희곡, 에세이, 힐링물)"
                />
              </div>
              <div className="mt-2 flex gap-x-1 text-sm font-semibold">
                {keywordArr.map((e: string) => {
                  return (
                    <div className="px-2 bg-yellow-50 text-yellow-400 border border-yellow-400 rounded-full">
                      {e}
                    </div>
                  );
                })}
              </div>

              {/* edit zone */}
              <textarea
                onChange={(e) => {
                  setKeywordArr(e.currentTarget.value);
                }}
                className="mt-10 outline-none resize-none w-full h-96 bg-gray-100 rounded-lg p-5"
              />
              {/* button zone */}
              <div className="mt-5 flex gap-x-4 justify-center">
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className=" bg-gray-300 text-white font-semibold px-4 py-1 rounded-lg text-lg"
                >
                  취소하기
                </button>
                <button
                  // onClick={response}
                  className=" bg-yellow-300 text-white font-semibold px-4 py-1 rounded-lg text-lg"
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMemoList;
