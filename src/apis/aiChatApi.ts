export const getChatData = async (chatId: string) => {
  const res = await fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/chat/get?chatId=${chatId}`,
  );
  const data = await res.json();
  return data;
};
