export const getDiaryListByTag = async (
  memberId: number,
  tagName: string[],
) => {
  const tagParams = tagName.map((tag) => `tagName=${tag}`).join('&');
  const url = `${process.env.REACT_APP_HTTP_API_KEY}/diary/list/tag?userId=${memberId}&${tagParams}`;
  return fetch(url).then((res) => res.json());
};
