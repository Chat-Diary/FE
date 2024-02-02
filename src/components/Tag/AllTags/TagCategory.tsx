import React, { useEffect, useState } from 'react';
import styles from './TagCategory.module.scss';
import TagChip from './TagChip';

interface IProps {
  category: string;
  tagNames: string[];
  selectedTag: string[];
}

const TagCategory = ({ category, tagNames, selectedTag }: IProps) => {
  // selectedTags는 선택된 모든 태그 (카테고리 무관)
  const [selectedCategoryTags, setSelectedCategoryTags] =
    useState<string[]>(selectedTag);

  const handleClick = (tag: string) => {
    // 태그 클릭 시 추가 또는 삭제
    if (!selectedCategoryTags.includes(tag))
      setSelectedCategoryTags((prev) => [...prev, tag]);
    else setSelectedCategoryTags(selectedCategoryTags.filter((t) => t !== tag));
  };

  useEffect(() => {
    const array = Array.from(Object.values(selectedCategoryTags)[0]);
    setSelectedCategoryTags(array);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.category}>{category}</div>
      <div className={styles.tagContainer}>
        {tagNames !== null &&
          tagNames.map((tag, index) => {
            return (
              <TagChip
                key={index}
                type={
                  Object.values(selectedCategoryTags).find((t) => tag === t)
                    ? 'selected'
                    : 'default'
                }
                onClick={() => handleClick(tag)}
              >
                {tag}
              </TagChip>
            );
          })}
      </div>
    </div>
  );
};

export default TagCategory;
