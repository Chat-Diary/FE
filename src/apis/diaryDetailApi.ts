export const getDiaryDetail = (diaryDate: string) => {
  // 로그인 미구현 예상 -> user_id 상수로
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/detail?user_id=1&diary_date=${diaryDate}`,
  ).then((res) => res.json());
};
