import { getDaysInMonth } from 'date-fns';
import { useState } from 'react';

const DATE_MONTH_FIXER = 1;
const CALENDER_LENGTH = 35;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const totalMonthDays = getDaysInMonth(currentDate);

  const chatData = [
    {
      dates: ['2024-01-28'],
      responses: [
        {
          sender: 'USER',
          exists: true,
        },
        {
          sender: 'DADA',
          exists: true,
        },
        {
          sender: 'CHICHI',
          exists: true,
        },
        {
          sender: 'LULU',
          exists: true,
        },
      ],
    },
    {
      dates: ['2024-01-27'],
      responses: [
        {
          sender: 'USER',
          exists: true,
        },
        {
          sender: 'DADA',
          exists: true,
        },
        {
          sender: 'CHICHI',
          exists: false,
        },
        {
          sender: 'LULU',
          exists: true,
        },
      ],
    },
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
      const chatInfo = chatData.find(
        (chat) => chat.dates[0] === currentDateStr,
      );
      acc[chunkIndex].push({
        day: cur,
        characters: chatInfo
          ? chatInfo.responses
              .filter((response) => response.exists)
              .map((response) => response.sender)
          : [],
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
