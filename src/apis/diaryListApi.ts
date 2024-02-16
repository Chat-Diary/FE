import { HTTP_URL } from '.';

export const getDiaryList = async (
  userId: number,
  year: number,
  month: number,
) => {
  const res = await fetch(
    `${HTTP_URL}/diary/monthly/list?user_id=${userId}&year=${year}&month=${month}`,
  );
  const data = await res.json();
  return data;
};
