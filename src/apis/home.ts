import { HTTP_URL } from '.';
import { getUserId } from '../utils/user';

export const getCalendarData = async (month: string) => {
  const res = await fetch(`${HTTP_URL}/chat/chat?memberId=${getUserId()}&month=${month}`);
  const data = await res.json();
  return data;
};

export const getDiaryStreakDate = async () => {
  const res = await fetch(`${HTTP_URL}/diary/streak?memberId=${getUserId()}`);
  const data = await res.json();
  return data;
};
