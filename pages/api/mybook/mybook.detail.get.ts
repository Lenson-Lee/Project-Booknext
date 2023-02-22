interface Props {
  data: any;
}

export default function List({ data }: Props) {
  return data;
}

// 나의서재 책 상세정보
export async function getBookDetail(target: any) {
  const isbnType = target.isbn13 != "null" ? "ISBN13" : "ISBN";
  const isbnID = target.isbn13 != "null" ? target.isbn13 : target.isbn;
  const TTB = process.env.ALADIN_TTBKEY;

  const request = await fetch(
    `
    http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${TTB}&itemIdType=${isbnType}&ItemId=${isbnID}&SearchTarget=Book&output=js&Version=20131101&Cover=Big
  `
  );
  const response = await request.json();
  const data = response?.item[0];
  return {
    data,
  };
}
