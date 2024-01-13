import React from 'react';
import DiaryItem from './DiaryItem';

const diaries = [{"id":1}, {"id":2}, {"id":3}, {"id":4}, {"id":5}]

const List = () => {
  return <div>
    {diaries.map((diary) => {
      return <DiaryItem key={diary.id} />
    })}
  </div>;
};

export default List;
