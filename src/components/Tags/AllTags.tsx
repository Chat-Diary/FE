import React from 'react';
import styles from './AllTags.module.scss';

import TagChip from './TagChip';

interface IProps {
  index: number[];
  isInit: boolean;
}

interface TagCategory {
  category: string;
  tags: string[];
}

const AllTags = ({ index, isInit }: IProps) => {
  const allTags: TagCategory[] = [
    {
      category: '감정',
      tags: [
        '기쁨',
        '슬픔',
        '화남',
        '피곤함',
        '괜찮음',
        '당황',
        '무서움',
        '설렘',
      ],
    },
    {
      category: '인물',
      tags: ['친구', '가족', '동료', '선후배', '초면', '선생님'],
    },
    {
      category: '행동',
      tags: ['식사', '공부', '여행', '술', '영화', '수다', '게임', '업무'],
    },
    {
      category: '장소',
      tags: ['식당', '학교', '회사', '집', '버스', '카페'],
    },
  ];

  return (
    <div className={styles.container}>
      {allTags.map((block, blockIndex) => {
        const blockTags = block.tags;
        return (
          <div className={styles.categoryContainer} key={blockIndex}>
            <div>{block.category}</div>
            <div className={styles.tagContainer}>
              {blockTags.map((tag, tagIndex) => (
                <TagChip key={tagIndex}>{tag}</TagChip>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllTags;
