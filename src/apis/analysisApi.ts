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
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/tags?memberId=${memberId}&type=${type}`,
  ).then((res) => res.json());
};

export const getFrequentAis = async (memberId: number, type: string) => {
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/chat/sender?memberId=${memberId}&type=${type}`,
  ).then((res) => res.json());
};

export const getTagDetailRanking = async (memberId: number, type: string) => {
  console.log(`${process.env.REACT_APP_HTTP_API_KEY}/diary/tags/detail?memberId=${memberId}&type=${type}`);
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/tags/detail?memberId=${memberId}&type=${type}`,
  ).then((res) => res.json());
};