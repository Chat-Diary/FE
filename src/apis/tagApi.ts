export const getDiaryListByTag = async (
  memberId: number,
  tagName: string[],
) => {
  const tagParams = tagName.map((tag) => `tagName=${tag}`).join('&');
  const url = `${process.env.REACT_APP_HTTP_API_KEY}/diary/list/tag?userId=${memberId}&${tagParams}`;
  return fetch(url).then((res) => res.json());
};

export const getTagPool = async () => {
  const res = await fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/tags/pool`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch diary detail');
  }

  const data = await res.json();
  return data;
};
