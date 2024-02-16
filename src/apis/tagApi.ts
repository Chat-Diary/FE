import { HTTP_URL } from '.';

export const getDiaryListByTag = async (
  memberId: number,
  tagName: string[],
) => {
  const tagParams = tagName.map((tag) => `tagName=${tag}`).join('&');
  const res = await fetch(
    `${HTTP_URL}/diary/list/tag?userId=${memberId}&${tagParams}`,
  );
  const data = await res.json();
  return data;
};

export const getTagPool = async () => {
  const res = await fetch(`${HTTP_URL}/diary/tags/pool`);

  if (!res.ok) {
    throw new Error('Failed to fetch diary detail');
  }

  const data = await res.json();
  return data;
};
