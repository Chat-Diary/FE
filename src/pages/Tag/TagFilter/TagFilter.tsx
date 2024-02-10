import { useEffect, useState } from 'react';
import styles from './TagFilter.module.scss';
import AllTags from '../../../components/Tag/AllTags/AllTags';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import { TagInit } from '../../../assets';
import { Link } from 'react-router-dom';

const TagFilter = () => {
  // 초기화 버튼 누르면 true로 변경
  const [isInit, setIsInit] = useState<boolean>(false);
  // 선택되어 있는 태그가 하나라도 있으면 true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [newData, setNewData] = useState<string[]>([]);

  const toggleInit = () => {
    setIsInit(true);
  };

  useEffect(() => {
    if (newData) {
      if (newData.length === 0) {
        setIsSelected(false);
      } else {
        setIsSelected(true);
      }
    }
  }, [newData]);

  return (
    <>
      <ChangeHeader>필터 선택</ChangeHeader>
      <AllTags
        currentTags={newData !== undefined ? newData : []}
        setTagFilter={setNewData}
        isInit={false}
      />
      <div className={styles.btnContainer}>
        <button className={styles.initBtn} onClick={toggleInit}>
          <div className={styles.icon}>
            <TagInit />
          </div>
          <div>초기화</div>
        </button>
        <Link
          className={`${styles.confirmBtn} ${isInit ? '' : styles.abled} ${
            isSelected ? styles.abled : ''
          }`}
          to={`/tag`}
          state={{ tagData: newData }}
        >
          <div className={styles.conformText}>적용하기</div>
        </Link>
      </div>
    </>
  );
};

export default TagFilter;
