export const getDiaryList = (userId: number, year: number, month: number) => {
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/monthly/list?user_id=${userId}&year=${year}&month=${month}`,
  ).then((res) => res.json());
};
