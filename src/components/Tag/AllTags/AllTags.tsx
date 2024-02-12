import React, { useEffect, useState } from 'react';
import styles from './AllTags.module.scss';

import TagCategory from './TagCategory';
import { DiaryDetailType } from '../../../apis/diaryDetailApi';

interface TagType {
  tagId: number;
  category: string;
  tagName: string;
}

interface CategoryType {
  category: string;
  tagNames: string[];
}

interface IProps {
  currentTags: string[];
  setNewTags?: React.Dispatch<React.SetStateAction<DiaryDetailType>>;
  setTagFilter?: React.Dispatch<React.SetStateAction<string[]>>;
  isInit?: boolean;
  setIsInit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AllTags = ({
  currentTags,
  setNewTags,
  setTagFilter,
  isInit = false,
}: IProps) => {
  const allTags: TagType[] = [
    {
      tagId: 1,
      category: '감정',
      tagName: '기쁨',
    },
    {
      tagId: 2,
      category: '감정',
      tagName: '슬픔',
    },
    {
      tagId: 3,
      category: '감정',
      tagName: '화남',
    },
    {
      tagId: 4,
      category: '감정',
      tagName: '피곤함',
    },
    {
      tagId: 5,
      category: '감정',
      tagName: '설렘',
    },
    {
      tagId: 6,
      category: '감정',
      tagName: '당황',
    },
    {
      tagId: 7,
      category: '감정',
      tagName: '무서움',
    },
    {
      tagId: 8,
      category: '인물',
      tagName: '친구',
    },
    {
      tagId: 9,
      category: '인물',
      tagName: '가족',
    },
    {
      tagId: 10,
      category: '인물',
      tagName: '동료',
    },
    {
      tagId: 11,
      category: '인물',
      tagName: '애인',
    },
    {
      tagId: 12,
      category: '인물',
      tagName: '지인',
    },
  ];

  // 선택된 태그 담는 배열
  const [selectedTags, setSelectedTags] = useState<string[]>(currentTags);

  // 카테고리에 따라 전체 태그 파싱
  const parseByCategory = (tags: TagType[]) => {
    const parsedTags: CategoryType[] = [];

    tags.forEach((t) => {
      const existingCategory = parsedTags.find(
        (data) => data.category === t.category,
      );

      // 불러온 데이터를 카테고리에 따라 parsedTags에 넣음
      if (existingCategory) {
        existingCategory.tagNames.push(t.tagName);
      } else {
        parsedTags.push({
          category: t.category,
          tagNames: [t.tagName],
        });
      }
    });
    return parsedTags;
  };

  //초기화하는 함수
  const resetTags = () => {
    const updatedSelectedTags: string[] = [];
    setSelectedTags(updatedSelectedTags);
  };

  useEffect(() => {
    // 초기화
    if (isInit) {
      if (setTagFilter !== undefined) {
        setTagFilter([]);
      }
      resetTags();
    }
  }, [isInit]);

  useEffect(() => {
    if (setNewTags !== undefined) {
      setNewTags((prev) => ({
        ...prev,
        tagName: selectedTags,
      }));
      console.log('AllTags: ', selectedTags);
    }

    if (setTagFilter !== undefined) {
      setTagFilter(selectedTags);
    }
  }, [selectedTags]);

  return (
    <div className={styles.container}>
      {parseByCategory(allTags).map((tags, key) => {
        return (
          <TagCategory
            key={key}
            category={tags.category}
            tagNames={tags.tagNames}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        );
      })}
    </div>
  );
};

export default AllTags;
