import React, { useEffect } from 'react';
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
  // // selectedTags는 선택된 모든 태그 (카테고리 무관)
  // const [selectedCategoryTags, setSelectedCategoryTags] =
  //   useState<string[]>(selectedTags);

  const handleClick = (tag: string) => {
    // 태그 클릭 시 추가 또는 삭제
    if (setSelectedTags) {
      if (!selectedTags.includes(tag))
        setSelectedTags((prev) => [...prev, tag]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      else setSelectedTags((prev) => selectedTags.filter((t) => t !== tag));
    }
  };

  // useEffect(() => {
  //   const array = Array.from(Object.values(selectedCategoryTags));
  //   setSelectedCategoryTags(array);
  // }, []);

  // 태그 선택될 때마다 set
  useEffect(() => {
    if (setSelectedTags)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setSelectedTags((prev) => selectedTags);
  }, [selectedTags]);

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
                  Object.values(selectedTags).find((t) => tag === t)
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
