import { HTTP_URL } from '.';

export const getCalendarData = async (month: string) => {
  const res = await fetch(`${HTTP_URL}/chat/chat?memberId=1&month=${month}`);
  const data = await res.json();
  return data;
};

export const getDiaryStreakDate = async (memberId: number) => {
  const res = await fetch(`${HTTP_URL}/diary/streak?memberId=${memberId}`);
  const data = await res.json();
  return data;
};
