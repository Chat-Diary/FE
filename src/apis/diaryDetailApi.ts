import { HTTP_URL } from '.';

export interface DiaryDetailType {
  userId: number;
  diaryDate: string;
  title: string;
  imgUrl?: string[]; // 프론트 디버깅용 -> 서버에 전달 X
  content: string;
  tagName?: string[];
  deleteImgUrls: string[];
  newImgUrls: [];
  newImgFile?: File[]; // 프론트 디버깅용 -> 서버에 전달 X
}

export const getDiaryDetail = async (userId: number, diaryDate: string) => {
  const res = await fetch(
    `${HTTP_URL}/diary/detail?user_id=${userId}&diary_date=${diaryDate}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch diary detail');
  }

  const data = await res.json();
  return data;
};

export const modifyDiaryDetail = async (newData: FormData) => {
  const res = await fetch(`${HTTP_URL}/diary/modify`, {
    method: 'POST',
    body: newData,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

export const deleteDiary = async (userId: number, diaryDate: string) => {
  const res = await fetch(`${HTTP_URL}/diary/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      diaryDate: diaryDate,
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  if (data === 'success') return true;
  else return false;
};
