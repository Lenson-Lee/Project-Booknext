interface Props {
  data: {};
}

export default function List({ data }: Props) {
  return data;
}

// 검색결과
export async function searchData(target: string) {
  const TTB = process.env.ALADIN_TTBKEY;

  const request = await fetch(
    `
    http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${TTB}&itemIdType=ISBN13&ItemId=${target}&output=js&Version=20131101&Cover=Big
  `
  );
  const response = await request.json();
  const data = response.item;
  return {
    data,
  };
}
