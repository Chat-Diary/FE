import { HTTP_URL } from '.';
import { getUserId } from '../utils/user';

export interface frequentTagType {
  category: string;
  tagName: string;
  count: number;
  percentage: number;
}

export interface frequentAiType {
  sender: string;
  chatCount: number;
  percentage: number;
}

export const getFrequentTags = async (type: string) => {
const res = await fetch(
`${HTTP_URL}/diary/tags?memberId=${getUserId()}&type=${type}`,
);
const data = res.json();
return data;
};

export const getFrequentAis = async (type: string) => {
  const res = await fetch(
    `${HTTP_URL}/chat/sender?memberId=${getUserId()}&type=${type}`,
  );
  const data = res.json();
  return data;
};

export const getTagDetailRanking = async (type: string) => {
  const res = await fetch(
    `${HTTP_URL}/diary/tags/detail?memberId=${getUserId()}&type=${type}`,
  );
  const data = res.json();
  return data;
};
