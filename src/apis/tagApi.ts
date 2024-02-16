import { HTTP_URL } from '.';

export const getDiaryListByTag = async (
  tagName: string[],
) => {
  const tagParams = tagName.map((tag) => `tagName=${tag}`).join('&');
  const res = await fetch(
    `${HTTP_URL}/diary/list/tag?userId=${localStorage.getItem("userId")}&${tagParams}`,
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
