import { useEffect, useState } from 'react';
import styles from './TagFilter.module.scss';
import AllTags from '../../../components/Tag/AllTags/AllTags';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import { TagInit } from '../../../assets';
import { Link } from 'react-router-dom';
import useTagStore from '../../../stores/tagStore';

const TagFilter = () => {
  const { tags, setTags } = useTagStore();
  // 초기화 버튼 누르면 true로 변경
  const [isInit, setIsInit] = useState<boolean>(false);
  const [newData, setNewData] = useState<string[]>(tags);

  const toggleInit = () => {
    setIsInit(true);
    setNewData([]);
  };

  const onSaveTags = () => {
    setTags(newData);
  };

  useEffect(() => {
    if (newData) {
      if (newData.length === 0) {
        setIsInit(true);
      } else {
        setIsInit(false);
      }
    }
  }, [newData, isInit]);

  return (
    <>
      <ChangeHeader>필터 선택</ChangeHeader>
      <AllTags
        currentTags={newData !== undefined ? newData : []}
        setTagFilter={setNewData}
        isInit={isInit}
      />
      <div className={styles.btnContainer}>
        <button className={styles.initBtn} onClick={toggleInit}>
          <div className={styles.icon}>
            <TagInit />
          </div>
          <div>초기화</div>
        </button>
        <Link
          className={`${styles.confirmBtn} ${isInit ? '' : styles.abled}
          }`}
          to={`/tag`}
          state={{ tagData: newData !== undefined ? newData : [] }}
          onClick={onSaveTags}
        >
          <div className={styles.conformText}>적용하기</div>
        </Link>
      </div>
    </>
  );
};

export default TagFilter;
