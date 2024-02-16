import { HTTP_URL } from '.';

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

export const getFrequentTags = async (memberId: number, type: string) => {
  const res = await fetch(
    `${HTTP_URL}/diary/tags?memberId=${memberId}&type=${type}`,
  );
  const data = res.json();
  return data;
};

export const getFrequentAis = async (memberId: number, type: string) => {
  const res = await fetch(
    `${HTTP_URL}/chat/sender?memberId=${memberId}&type=${type}`,
  );
  const data = res.json();
  return data;
};

export const getTagDetailRanking = async (memberId: number, type: string) => {
  const res = await fetch(
    `${HTTP_URL}/diary/tags/detail?memberId=${memberId}&type=${type}`,
  );
  const data = res.json();
  return data;
};
