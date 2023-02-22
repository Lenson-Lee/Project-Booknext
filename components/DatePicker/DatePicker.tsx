/**
 * @file Clickable.js
 * @author Tiumsolutions (developers@tiumsolutions.com)
 * @brief react-datepicker 커스텀, 날짜 선택 기능.
 *        커스텀한 디자인을 사용하기 위해서는 Date.css를 꼭 함께 넣어야합니다.
 *        renderCustomHeader : datepicker에서 제공하는 props.
 **/

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; //기본 datepicker.css

// import { StyleDate } from "./Style";
import { getYear, getMonth, getDate, getDay } from "date-fns";
import { ko } from "date-fns/esm/locale";

const Clickable = () => {
  //달력 컴포넌트 숨김/출력 버튼 상태. 참일때 열려있음
  const [hide, setHide] = useState(true);

  const [startDate, setStartDate] = useState(new Date());

  //요일찾기
  const findDay = (e: number) => {
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    return dayList[e];
  };

  // const toggleHide = () => {
  //   setHide(!hide);
  // };
  const days =
    getYear(startDate) +
    "년 " +
    (getMonth(startDate) + 1) +
    "월 " +
    getDate(startDate) +
    "일 " +
    "(" +
    findDay(getDay(startDate)) +
    ")";

  return (
    <>
      <div className="max-w-2xl mx-auto md:mx-0">
        {/* 달력 출력 창 */}
        {/* <StyleDate> */}
        <DatePicker
          locale={ko} //한국어
          selected={startDate} //value
          onChange={(date: any) => setStartDate(date)} //날짜 선택 시 실행될 함수
          dateFormatCalendar={"yyyy년 MMM"}
          dateFormat="yyyy년 MM월 dd일"
        />
        {/* </StyleDate> */}
      </div>
    </>
  );
};

export default Clickable;
