import React, { useEffect, useState } from 'react';
import styles from './AllTags.module.scss';

import TagCategory from './TagCategory';
import { DiaryDetailType } from '../../../apis/diaryDetailApi';
import { useQuery } from 'react-query';
import { getTagPool } from '../../../apis/tagApi';

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
  isLimit?: boolean;
}

const AllTags = ({
  currentTags,
  setNewTags,
  setTagFilter,
  isInit = false,
  isLimit,
}: IProps) => {
  // 태그풀
  const [tagPool, setTagPool] = useState<TagType[]>();
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

  const { data, error } = useQuery({
    queryKey: ['tag_pool'],
    queryFn: () => getTagPool(),
  });

  useEffect(() => {
    // 초기화
    if (isInit) {
      if (setTagFilter) {
        setTagFilter([]);
      }
      resetTags();
    }
  }, [isInit]);

  useEffect(() => {
    if (setNewTags) {
      setNewTags((prev) => ({
        ...prev,
        tagName: selectedTags,
      }));
    }

    if (setTagFilter) {
      setTagFilter(selectedTags);
    }
  }, [selectedTags]);

  useEffect(() => {
    if (data) {
      setTagPool(data);
    }
  }, [data]);

  if (error) console.log('AllTags error : ', error);

  return (
    <div className={styles.container}>
      {parseByCategory(tagPool ? tagPool : []).map((tags, key) => {
        return (
          <TagCategory
            key={key}
            category={tags.category}
            tagNames={tags.tagNames}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            isLimit={isLimit}
          />
        );
      })}
    </div>
  );
};

export default AllTags;
