export const login = async (code: string) => {
  return await fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/kakao/login/code=${code}`,
  ).then((res) => res.json());
};
