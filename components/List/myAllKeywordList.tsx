interface Props {
  keywordList: [];
}
const list = ({ keywordList }: Props) => {
  //
  //
  return (
    <>
      <p className="text-xl font-semibold">내가 저장한 키워드</p>
      <div className="mt-4 flex gap-2 flex-wrap">
        {keywordList.map((kw, index) => {
          return (
            <div
              key={index}
              className="px-2 py-1 bg-yellow-50 text-yellow-400 border border-yellow-400 text-sm rounded-full inline"
            >
              {kw}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default list;
