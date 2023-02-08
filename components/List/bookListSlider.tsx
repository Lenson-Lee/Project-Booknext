import Slider from "react-slick";
import Head from "next/head";
interface Props {
  data: any;
  title: string;
}

const BookListSlider = ({ data, title }: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
  };

  return (
    <>
      {/* react-slider css import시 오류발생 */}
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>

      {/* 제목 + 구분 */}
      <div className="flex mb-8">
        <div className="text-2xl font-bold mr-8">{title}</div>
      </div>

      {/* 책 리스트 슬라이더로 출력 */}
      <Slider {...settings}>
        {data?.data.item.map((book: any) => (
          <div key={book.title} className="">
            <img
              alt="책표지"
              src={book.cover}
              className="object-cover object-center border bg-gray-100 w-44 mx-auto h-60"
            ></img>
            <div className="w-44 mt-4 mx-auto">
              <div className="line-clamp-2 text-base line-clamp-1 font-semibold">
                {book.title}
              </div>
              <div className="line-clamp-1 text-sm line-clamp-1">
                {book.author}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default BookListSlider;
