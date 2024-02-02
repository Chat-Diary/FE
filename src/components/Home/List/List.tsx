import React from 'react';
import DiaryItem from './DiaryItem';
import { useQuery } from 'react-query';
import { getDiaryList } from '../../../apis/diaryListApi';

const diaries = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

// const { isLoading, error, data } = useQuery({
//   queryKey: ['user_id', 'year', 'month'],
//   queryFn: () => getDiaryList(userId, year, month),
// });

const List = () => {
  return (
    <div>
      {diaries.map((diary) => {
        return <DiaryItem key={diary.id} />;
      })}
    </div>
  );
};

export default List;
