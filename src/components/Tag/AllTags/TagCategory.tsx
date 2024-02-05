import React, { useEffect, useState } from 'react';
import styles from './TagCategory.module.scss';
import TagChip from './TagChip';

interface IProps {
  category: string;
  tagNames: string[];
  selectedTags: string[];
  setSelectedTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagCategory = ({
  category,
  tagNames,
  selectedTags,
  setSelectedTags,
}: IProps) => {
  // selectedTags는 선택된 모든 태그 (카테고리 무관)
  const [selectedCategoryTags, setSelectedCategoryTags] =
    useState<string[]>(selectedTags);

  const handleClick = (tag: string) => {
    console.log(selectedCategoryTags);
    // 태그 클릭 시 추가 또는 삭제
    if (!selectedCategoryTags.includes(tag))
      setSelectedCategoryTags((prev) => [...prev, tag]);
    else setSelectedCategoryTags(selectedCategoryTags.filter((t) => t !== tag));
  };

  useEffect(() => {
    const array = Array.from(Object.values(selectedCategoryTags));
    setSelectedCategoryTags(array);

    if (setSelectedTags !== undefined) setSelectedTags(selectedCategoryTags);
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
