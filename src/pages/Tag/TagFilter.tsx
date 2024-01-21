import { useState } from 'react';
import styles from './TagFilter.module.scss';
import AllTags from '../../components/Tags/AllTags';
import ChangeHeader from '../../components/Headers/ChangeHeader';
import { TagInit } from '../../assets';

const TagFilter = () => {
  // 초기화 버튼 누르면 true로 변경
  const [isInit, setIsInit] = useState<boolean>(false);
  // 선택되어 있는 태그가 하나라도 있으면 true
  const [isSelected, setIsSelected] = useState<boolean>();

  const toggleInit = () => {
    setIsInit(true);
  };

  const toggleConfirm = () => {
    console.log('적용하기');
  };

  return (
    <>
      <ChangeHeader>필터 선택</ChangeHeader>
      <AllTags
        index={[
          { category: '감정', index: [0, 3, 4] },
          { category: '인물', index: [0] },
          { category: '행동', index: [0, 3, 4, 5] },
          { category: '장소', index: [0, 3, 4, 5] },
        ]}
        isInit={isInit}
        setIsInit={setIsInit}
      />
      <div className={styles.btnContainer}>
        <button className={styles.initBtn} onClick={toggleInit}>
          <div className={styles.icon}>
            <TagInit />
          </div>
          <div>초기화</div>
        </button>
        <button
          className={`${styles.confirmBtn} ${isInit ? '' : styles.abled} ${
            isSelected ? styles.abled : ''
          }`}
          onClick={toggleConfirm}
        >
          <div>적용하기</div>
        </button>
      </div>
    </>
  );
};

export default TagFilter;
