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
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/detail?user_id=${userId}&diary_date=${diaryDate}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch diary detail');
  }

  const data = await res.json();
  return data;
};

export const modifyDiaryDetail = async (newData: FormData) => {
  const res = await fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/modify`,
    {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: newData,
    },
  );

  if (!res.ok) {
    // Handle error if the response status is not OK (e.g., 4xx or 5xx)
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
