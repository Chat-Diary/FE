import React, { useEffect, useState } from 'react';
import DiaryItem from './DiaryItem';
import useCalendar from '../../../hooks/useCalendar';

interface TagInfo {
  tagId: number;
  tagName: string;
}

interface Diary {
  id: number;
  title: string;
  diaryDate: string;
  photoUrls: string[];
  tagList: TagInfo[];
  tagId: number;
  tagName: string;
}

interface IProps {
  dataList?: Diary[];
}

const List = ({dataList}: IProps) => {
  console.log(dataList)

  if (!dataList) {
    return <></>;
  }

  return (
    <div>
      {dataList?.map((diaryItem: Diary) => {
        return <DiaryItem key={diaryItem.id} diary={diaryItem} />;
      })}
    </div>
  );
};

export default List;
