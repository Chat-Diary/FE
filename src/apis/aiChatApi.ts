import { HTTP_URL } from '.';

export const getChatData = async (userId: number, chatId: string) => {
  const res = await fetch(
    `${HTTP_URL}/chat/get?userId=${userId}&chatId=${chatId}`,
  );
  const data = await res.json();
  return data;
};
