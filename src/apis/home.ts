export const getCalendarData = (month: string) => {
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/chat/chat?memberId=1&month=${month}`,
  ).then((res) => res.json());
};

export const getDiaryStreakDate = () => {
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/streak?memberId=1`,
  ).then((res) => res.json());
};