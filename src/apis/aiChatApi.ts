import { HTTP_URL } from '.';

export const getChatData = async (chatId: string) => {
  const res = await fetch(`${HTTP_URL}/chat/get?chatId=${chatId}`);
  const data = await res.json();
  return data;
};
