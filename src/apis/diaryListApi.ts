import { HTTP_URL } from '.';
import { getUserId } from '../utils/user';

export const getDiaryList = async (year: number, month: number) => {
  const res = await fetch(
    `${HTTP_URL}/diary/monthly/list?user_id=${getUserId()}&year=${year}&month=${month}`,
  );
  const data = await res.json();
  return data;
};
