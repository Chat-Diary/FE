import React from 'react';
import styles from './DiaryItem.module.scss';
import { DetailSlider } from '../../../assets/index';

const tags = [
  { id: 1, tag: '#피곤함' },
  { id: 2, tag: '#식사' },
  { id: 3, tag: '#업무' },
  { id: 4, tag: '#식당' },
  { id: 5, tag: '#잠' },
  { id: 6, tag: '#술' },
  { id: 7, tag: '#괜찮음' },
  { id: 8, tag: '#영화' },
  { id: 9, tag: '#선후배' },
];

const tagMaxLengthToShow = 23;
let currentLength = 0;
const result: string[] = [];

for (const tag of tags) {
  const tagText = tag.tag;

  // 현재 길이에 태그를 추가해도 최대 길이를 초과하지 않을 경우에만 추가
  if (currentLength + tagText.length <= tagMaxLengthToShow) {
    result.push(tagText);
    currentLength += tagText.length + 1; // 추가된 태그와 공백 길이를 더함
  } else {
    break; // 최대 길이를 초과하면 반복 중단
  }
}

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

interface DiaryItemProps {
  diary: Diary;
}

const DiaryItem = ({ diary }: DiaryItemProps) => {
  return (
    <div className={styles.DiaryItem}>
      <DetailSlider className={styles.DiaryImg} key={0} />
      <div>
        <div className={styles.DiaryTitleContainer}>
          <div className={styles.DiaryTitle}>{diary.title}</div>
        </div>
        <div className={styles.DiaryDate}>{diary.diaryDate}</div>
        <div className={styles.DiaryTags}>
          {diary.tagList.map((tagText) => {
            return <div key={1}>{tagText.tagName}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default DiaryItem;
