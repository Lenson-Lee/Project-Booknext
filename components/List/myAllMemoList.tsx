interface Props {
  memoList: [];
}
const list = ({ memoList }: Props) => {
  return (
    <>
      <p className="text-xl font-semibold">최근 기록한 메모</p>
      <div className="mt-4 flex gap-2 flex-wrap">
        {memoList.map((memo, index) => {
          return (
            <div
              key={memo + index}
              className="text-sm bg-gray-100 rounded-lg w-full p-5 line-clamp-3"
            >
              {memo}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default list;
