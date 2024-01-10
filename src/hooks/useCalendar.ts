import { getDaysInMonth, subMonths } from 'date-fns';
import { useState } from 'react';

const DATE_MONTH_FIXER = 1;
const CALENDER_LENGTH = 35;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;
const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const totalMonthDays = getDaysInMonth(currentDate);

  const chatData = [
    // 가정: 날짜별 대화 정보가 있는 배열
    { date: '2024-01-01', characters: ['dada'] },
    { date: '2024-01-02', characters: ['lulu', 'chichi'] },
    // ...
  ];

  const prevDayList = Array.from({
    length: Math.max(0, currentDate.getDay() - 1),
  }).map(() => DEFAULT_TRASH_VALUE);
  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1,
  );
  const nextDayList = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);
  const weekCalendarList = currentCalendarList.reduce(
    (acc: { day: number; characters: string[] }[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      const currentDateStr = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + DATE_MONTH_FIXER < 10
          ? '0' + (currentDate.getMonth() + DATE_MONTH_FIXER)
          : currentDate.getMonth() + DATE_MONTH_FIXER
      }-${cur < 10 ? '0' + cur : cur}`;
      const chatInfo = chatData.find((chat) => chat.date === currentDateStr);
      acc[chunkIndex].push({
        day: cur,
        characters: chatInfo?.characters || [],
      });
      return acc;
    },
    [],
  );
  return {
    weekCalendarList: weekCalendarList,
    currentDate: currentDate,
    setCurrentDate: setCurrentDate,
  };
};
export default useCalendar;
