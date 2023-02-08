interface Props {
  data: {};
}

const List = ({ data }: Props) => {
  return data;
};

// 알라딘 베스트셀러 리스트
export async function getBookList() {
  const request = await fetch(`
  http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbdmstjs74371420001&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101
  `);

  const response = await request.json();
  const data = response;

  return {
    data,
  };
}

export default List;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   console.log("api 진입");

//   const data = await axios
//     .get(
//       "http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbdmstjs74371420001&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101"
//     )
//     .then((res) => {
//       console.log(res.data);
//       console.log("=========== API 결과 끝 ===========");
//       return res.data;
//     });
//   return { props: { data } };
// }
