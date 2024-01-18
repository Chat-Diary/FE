import React, { useEffect, useState } from 'react';
import styles from './AllTags.module.scss';

import TagChip from './TagChip';

interface SelectedTag {
  category: '감정' | '인물' | '행동' | '장소';
  index: number[];
}

interface TagCategory {
  category: string;
  tags: string[];
}

interface IProps {
  index?: SelectedTag[]; // 선택된 게 없을 때
  isInit?: boolean;
}

const AllTags = ({ index, isInit = false }: IProps) => {
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

  // 선택된 태그 담는 배열
  const [selectedTags, setSelectedTags] = useState<Record<string, number[]>>(
    {},
  );

  useEffect(() => {
    // 기존에 선택되어 있는 태그들 배열에 추가
    if (index) {
      const updatedSelectedTags: Record<string, number[]> = {};
      index.forEach((t) => {
        allTags.forEach((c) => {
          if (c.category === t.category) {
            updatedSelectedTags[t.category] = t.index;
          }
        });
      });
      setSelectedTags(updatedSelectedTags);
    }
  }, []);

  const handleToggleClick = (category: string, tagIndex: number) => {
    setSelectedTags((prev) => {
      const updatedTags = prev[category]?.includes(tagIndex)
        ? prev[category]?.filter((index) => index !== tagIndex)
        : [...(prev[category] || []), tagIndex];
      console.log(selectedTags);
      return {
        ...prev,
        [category]: updatedTags,
      };
    });
  };

  // useEffect(() => {}, [selectedTags]);

  return (
    <div className={styles.container}>
      {allTags.map((block, blockIndex) => {
        const blockTags = block.tags;
        return (
          <div className={styles.categoryContainer} key={blockIndex}>
            <div>{block.category}</div>
            <div className={styles.tagContainer}>
              {blockTags.map((tag, tagIndex) => (
                <TagChip
                  key={tagIndex}
                  type={
                    selectedTags[block.category]?.includes(tagIndex)
                      ? 'selected'
                      : 'default'
                  }
                  onClick={() => handleToggleClick(block.category, tagIndex)}
                >
                  {tag}
                </TagChip>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllTags;
