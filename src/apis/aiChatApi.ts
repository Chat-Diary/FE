import { HTTP_URL } from '.';
import { getUserId } from '../utils/user';

export const getChatData = async (chatId: string) => {
  const res = await fetch(
    `${HTTP_URL}/chat/get?userId=${getUserId()}&chatId=${chatId}`,
  );
  const data = await res.json();
  return data;
};
