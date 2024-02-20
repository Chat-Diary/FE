import { HTTP_URL } from '.';

export const login = async (code: string) => {
  const res = await fetch(`${HTTP_URL}/kakao/login/local?code=${code}`);
  const data = await res.json();
  return data;
};
