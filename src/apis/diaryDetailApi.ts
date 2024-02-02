export interface DiaryDetailType {
  diaryDate: string;
  title: string;
  imgUrl: string[];
  content: string;
  tagName: string[];
  characterIndex: number;
}

export const getDiaryDetail = async (userId: number, diaryDate: string) => {
  return fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/detail?user_id=${userId}&diary_date=${diaryDate}`,
  ).then((res) => res.json());
};

export const modifyDiaryDetail = async (
  userId: number,
  diaryDate: string,
  title: string,
) => {
  const response = await fetch(
    `${process.env.REACT_APP_HTTP_API_KEY}/diary/modify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        diaryDate,
        title: title,
      }),
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
