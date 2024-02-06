export interface DiaryDetailType {
  userId: number;
  diaryDate: string;
  title: string;
  imgUrl?: string[]; // 프론트 디버깅용 -> 서버에 전달 X
  content: string;
  tagName: string[];
  deleteImgUrls: string[];
  newImgUrls: [];
  newImgFile?: File[]; // 프론트 디버깅용 -> 서버에 전달 X
}

export const getDiaryDetail = async (userId: number, diaryDate: string) => {
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/detail?user_id=${userId}&diary_date=${diaryDate}`,
  ).then((res) => res.json());
};

export const modifyDiaryDetail = async (newData: FormData) => {
  const response = await fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/modify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: newData,
    },
  );

  if (!response.ok) {
    // Handle error if the response status is not OK (e.g., 4xx or 5xx)
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  // Handle the data as needed};
  return data;
};
