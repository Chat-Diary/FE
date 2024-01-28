import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatFullDateToString = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSSS");
};

export const formatHourAndMinute = (date: string) => {
  return format(date, 'a h:mm', { locale: ko });
};

export const formatPeriod = (startDate: Date, endDate: Date) => {
  const formattedStartDate = format(startDate, 'yyyy.MM.dd');
  const formattedEndDate = format(endDate, 'yyyy.MM.dd');
  return `${formattedStartDate} ~ ${formattedEndDate}`;
};
