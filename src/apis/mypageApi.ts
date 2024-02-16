import { HTTP_URL } from '.';

export interface NoticeType {
  id: number;
  title: string;
  noticeDate: string;
}
export const getNotice = async () => {
  const res = await fetch(`${HTTP_URL}/notice/list`);

  if (!res.ok) {
    throw new Error('Failed to fetch diary detail');
  }

  const data = await res.json();
  return data;
};
