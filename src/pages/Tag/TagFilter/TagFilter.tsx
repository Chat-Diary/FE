import { useEffect, useState } from 'react';
import styles from './TagFilter.module.scss';
import AllTags from '../../../components/Tag/AllTags/AllTags';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import { TagInit, TagFilterInfo } from '../../../assets';
import { Link } from 'react-router-dom';
import useTagStore from '../../../stores/tagStore';

const TagFilter = () => {
  const { tags, setTags } = useTagStore();
  // 초기화 버튼 누르면 true로 변경
  const [isInit, setIsInit] = useState<boolean>(false);
  const [isLimited, setIsLimited] = useState<boolean>(false);
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

      if (newData.length >= 10) {
        setIsLimited(true);
      } else {
        setIsLimited(false);
      }
    }
  }, [newData, isInit]);

  return (
    <>
      <ChangeHeader>필터 선택</ChangeHeader>
      <div className={styles.tagLimitText}>
        <div className={styles.infoIcon}>
          <TagFilterInfo />
        </div>
        <div>일기를 표현할 수 있는 태그를 선택해주세요!(최대 10개)</div>
      </div>
      <AllTags
        currentTags={newData ? newData : []}
        setTagFilter={setNewData}
        isInit={isInit}
        isLimit={isLimited}
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
          state={{ tagData: newData ? newData : [] }}
          onClick={onSaveTags}
        >
          <div className={styles.conformText}>적용하기</div>
        </Link>
      </div>
    </>
  );
};

export default TagFilter;
