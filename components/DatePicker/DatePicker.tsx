/**
 * @file Clickable.js
 * @author Tiumsolutions (developers@tiumsolutions.com)
 * @brief react-datepicker 커스텀, 날짜 선택 기능. **/

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { StyleDate } from "./Style";
import { getYear, getMonth, getDate, getDay } from "date-fns";
import { ko } from "date-fns/locale";
// import { enUS } from "date-fns/locale"; //token excport 오류 발생시 변경해보기

interface Props {
  startDate: any;
  endDate: any;
}
const Clickable = () => {
  // const Clickable = ({ startDate, endDate }: Props) => {
  //달력 컴포넌트 숨김/출력 버튼 상태. 참일때 열려있음
  const [date, setDate] = useState(new Date());

  //요일찾기
  const findDay = (e: number) => {
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    return dayList[e];
  };

  const days =
    getYear(date) +
    "년 " +
    (getMonth(date) + 1) +
    "월 " +
    getDate(date) +
    "일 " +
    "(" +
    findDay(getDay(date)) +
    ")";

  return (
    <>
      <div className="max-w-2xl mx-auto md:mx-0 text-sm">
        {/* 달력 출력 창 */}
        <StyleDate>
          <DatePicker
            locale={ko} //한국어
            selected={date} //value
            onChange={(d: any) => setDate(d)} //날짜 선택 시 실행될 함수
            dateFormatCalendar={"yyyy년 MMM"}
            dateFormat="yyyy년 MM월 dd일"
          />
        </StyleDate>
      </div>
    </>
  );
};

export default Clickable;
