import ServiceLayout from "@/components/service_layout";
import { GetStaticProps } from "next";
import {
  getHighScoreBook,
  getMostPopularBook,
} from "../api/tour/tour.get.popular";
import Link from "next/link";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getSearchDetail } from "../api/search/search.detail";

interface Props {
  /** 인기순위 순서로 뽑은 책 상세내역 **/
  rankbook: any;
  scorebook: any;
}
function Tour({ rankbook, scorebook }: Props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
  };
  /** 순위에 맞춰 저장된 책 apidata List*/
  const rankData = JSON.parse(rankbook);
  const scoreData = JSON.parse(scorebook);

  return (
    <ServiceLayout>
      <p className="px-4 mt-10 mb-5 text-lg font-semibold">둘러보기</p>

      <div className="bg-white w-full h-fit py-10 px-10 rounded-xl border">
        <div className="flex gap-x-5 items-end mb-8">
          <div className="text-xl font-semibold ">
            가장 많이 읽은 바로 그 책
          </div>
          <p className="text-gray-500 text-sm">
            사용자들이 가장 많이 저장한 책
          </p>
        </div>
        <Slider {...settings}>
          {rankData.map((rank: any) => (
            <Link
              key={rank.isbn}
              href={{
                pathname: `/search/isbn=${rank.isbn}&isbn13=${
                  rank.isbn13 ? rank.isbn13 : "null"
                }/detail`,
                query: { data: JSON.stringify(rank) },
              }}
              className=""
            >
              <img
                alt="책표지"
                src={rank.cover}
                className="object-cover object-center border bg-gray-100 w-44 mx-auto h-60"
              />
              <div className="w-44 mt-4 mx-auto">
                <div className="line-clamp-2 text-base line-clamp-1 font-semibold">
                  {rank.title}
                </div>
                <div className="line-clamp-1 text-sm line-clamp-1">
                  {rank.author}
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
      <div className="mt-10 bg-white w-full h-fit py-10 px-10 rounded-xl border">
        <div className="flex gap-x-5 items-end mb-8">
          <div className="text-xl font-semibold ">모두가 추천하는 그 책</div>
          <p className="text-gray-500 text-sm">
            사용자들이 별점을 가장 높게 준 책
          </p>
        </div>
        <Slider {...settings}>
          {scoreData.map((score: any) => (
            <Link
              key={score.api.isbn}
              href={{
                pathname: `/search/isbn=${score.api.isbn}&isbn13=${
                  score.api.isbn13 ? score.api.isbn13 : "null"
                }/detail`,
                query: { data: JSON.stringify(score.api) },
              }}
              className=""
            >
              <img
                alt="책표지"
                src={score.api.cover}
                className="object-cover object-center border bg-gray-100 w-44 mx-auto h-60"
              />
              <div className="w-44 mt-4 mx-auto">
                <div className="line-clamp-2 text-base line-clamp-1 font-semibold">
                  {score.api.title}
                </div>
                <div className="line-clamp-1 text-sm line-clamp-1">
                  {score.api.author}
                </div>
                <div className="line-clamp-1 text-sm line-clamp-1 bg-yellow-300 p-2 rounded-full">
                  {score.score.score}
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </ServiceLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  /** fieldcount총합으로 순서 출력*/
  const rankList = await getMostPopularBook();

  const scoreList = await getHighScoreBook();

  let rankbooklist: any = [];
  let scorebooklist: any = [];
  /** popular 순서로 상세정보 GET 한 후 배열에 push */
  if (rankList) {
    for (let i = 0; i < rankList.data.popular.length; i++) {
      const bookinfo = await getSearchDetail({
        isbn13: rankList.data.popular[i].isbn13,
      });
      rankbooklist.push(bookinfo.data.apidata);
    }
  }

  if (scoreList) {
    for (let i = 0; i < scoreList.data.highscore.length; i++) {
      const bookinfo = await getSearchDetail({
        isbn13: scoreList.data.highscore[i].isbn13,
      });
      scorebooklist.push({
        api: bookinfo.data.apidata,
        score: scoreList.data.highscore[i]._avg,
      });
    }
  }

  return {
    props: {
      rankbook: JSON.stringify(rankbooklist),
      scorebook: JSON.stringify(scorebooklist),
    },
  };
};
export default Tour;
