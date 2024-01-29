export const getDiaryDetail = (userId: string, diaryDate: string) => {
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/detail?user_id=${userId}&diary_date=${diaryDate}`,
  ).then((res) => res.json());
};
