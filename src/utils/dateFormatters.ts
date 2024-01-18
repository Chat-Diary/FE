import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatFullDateToString = (date: Date) => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

export const formatHourAndMinute = (date: string) => {
  return format(date, 'a h:mm', { locale: ko });
};
