import { getDaysInMonth } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { getCalendarData } from '../apis/home';

interface IChatData {
  dates: string;
  sender: string | null;
  exists: boolean;
}

export interface ICalendar {
  day: number;
  character: string | null;
}

const DATE_MONTH_FIXER = 1;
const CALENDER_LENGTH = 42;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;
const TWO_DIGIT_FORMAT = 10;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1 < TWO_DIGIT_FORMAT
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1
    }`,
  );
  const totalMonthDays = getDaysInMonth(currentDate);
  const [chatData, setChatData] = useState<IChatData[]>([]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    setFormattedDate(
      `${year}-${month < TWO_DIGIT_FORMAT ? '0' + month : month}`,
    );
  }, [currentDate]);

  const { data, isLoading, error } = useQuery<IChatData[]>(
    ['calendarData', formattedDate],
    () => getCalendarData(formattedDate),
  );

  useEffect(() => {
    if (!isLoading && !error && data) {
      setChatData(data);
    }
  }, [data, isLoading, error]);

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const prevDayList = Array.from({
    length: Math.max(0, firstDayOfMonth),
  }).map(() => DEFAULT_TRASH_VALUE);
  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1,
  );
  const nextDayList = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);
  const weekCalendarList = currentCalendarList.reduce(
    (acc: ICalendar[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      const currentDateStr = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + DATE_MONTH_FIXER < 10
          ? '0' + (currentDate.getMonth() + DATE_MONTH_FIXER)
          : currentDate.getMonth() + DATE_MONTH_FIXER
      }-${cur < 10 ? '0' + cur : cur}`;
      const chatInfo = useMemo(() => {
        if (chatData && chatData.length > 0) {
          return chatData.find((chat) => chat.dates === currentDateStr);
        }
      }, [chatData, currentDateStr]);
      acc[chunkIndex].push({
        day: cur,
        character:
          chatInfo && chatInfo.exists && chatInfo.sender
            ? chatInfo.sender
            : null,
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
