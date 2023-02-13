interface Props {
  onClick: () => void;
}

export const GoogleLoginBtn = function ({ onClick }: Props) {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-yellow-600 rounded-full px-7 py-2 flex justify-center gap-x-5 text-white text-lg"
      >
        <img
          src="/google.svg"
          alt="google 로고"
          className="p-1 rounded-full bg-white"
        />
        <p>Google 계정으로 시작하기</p>
      </button>
    </>
  );
};
