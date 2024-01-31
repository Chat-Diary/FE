import { getDaysInMonth } from 'date-fns';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getCalendarData } from '../apis/home';

interface IChatData {
  dates: string[];
  responses: Response[];
}

interface Response {
  sender: string;
  exists: boolean;
}

const DATE_MONTH_FIXER = 1;
const CALENDER_LENGTH = 35;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const totalMonthDays = getDaysInMonth(currentDate);
  const [chatData, setChatData] = useState<IChatData[]>([]);

  const formattedDate = currentDate.toISOString().slice(0, 7);

  const { data, isLoading, error } = useQuery<IChatData[]>(
    ['chatData', formattedDate],
    () => getCalendarData(formattedDate),
  );

  useEffect(() => {
    if (chatData.length === 0 && !isLoading && !error && data) {
      setChatData(data);
    }
  }, [chatData, data, isLoading, error]);

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
