import { HTTP_URL } from '.';

export const getCalendarData = async (month: string) => {
  const res = await fetch(`${HTTP_URL}/chat/chat?memberId=${localStorage.getItem("userId")}&month=${month}`);
  const data = await res.json();
  return data;
};

export const getDiaryStreakDate = async () => {
  const res = await fetch(`${HTTP_URL}/diary/streak?memberId=${localStorage.getItem("userId")}`);
  const data = await res.json();
  return data;
};
