import React, { useState, useEffect } from 'react';
import BottomNav from '../../components/common/BottomNav/BottomNav';
import List from '../../components/Home/List/List';
import {
  ListIcon,
  Card32,
  TagDownChevron,
  TagFilter,
} from '../../assets/index';
import styles from './Tag.module.scss';
import CardView from '../../components/Tag/CardView/CardView';
import TagSortModal from '../../components/common/BottomSheets/TagSort/TagSortModal';
import HomeHeader from '../../components/common/Header/Header';
import TagChip from '../../components/Tag/AllTags/TagChip';
import { Link } from 'react-router-dom';
import NoTagResult from '../../components/Tag/NoTagResult';
import { useQuery } from 'react-query';
import { getDiaryListByTag } from '../../apis/tagApi';
import useTagStore from '../../stores/tagStore';

const Tag = () => {
  const { tags, diaryList, setTags, setDiaryList } = useTagStore();
  const [isList, setIsList] = useState<boolean>(true);
  const [currentSort, setCurrentSort] = useState<number>(1);
  const userId = 1;

  const toggleMode = () => {
    setIsList((prev) => !prev);
  };

  const [isSelectedSorted, setIsSelectedSorted] = useState(false);
  const [hasTag, setHasTag] = useState(false);

  const onSelectSort = () => {
    setIsSelectedSorted(true);
    setHasTag(true);
  };

  const {
    isLoading: listLoading,
    error: listError,
    data: diaryListData,
  } = useQuery({
    queryKey: ['diary', userId, tags],
    queryFn: () => {
      if (tags.length !== 0) {
        return getDiaryListByTag(userId, tags);
      }
    },
  });

  useEffect(() => {
    if (diaryList !== undefined) {
      if (currentSort === 1) {
        const sortedByLatest = [...diaryList].sort((a, b) => {
          const dateA = new Date(a.diaryDate);
          const dateB = new Date(b.diaryDate);
          return +dateA - +dateB; // dateB가 더 크다면 (최신이라면) 양수 반환하여 최신순으로 정렬
        });

        setDiaryList(sortedByLatest);
      } else {
        const sortedByLatest = [...diaryList].sort((a, b) => {
          const dateA = new Date(a.diaryDate);
          const dateB = new Date(b.diaryDate);
          return +dateB - +dateA;
        });

        setDiaryList(sortedByLatest);
      }
    }
  }, [currentSort]);

  useEffect(() => {
    if (tags.length === 0) {
      setTags(['화남']);
    }
  }, []);

  useEffect(() => {
    if (diaryListData) {
      setDiaryList(diaryListData);
    }
  }, [diaryListData]);

  useEffect(() => {
    if (isSelectedSorted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSelectedSorted, currentSort]);

  useEffect(() => {
    if (diaryList.length === 0) {
      setHasTag(false);
    } else {
      setHasTag(true);
    }
  }, [diaryList]);

  if (listLoading) {
    return <>loading..</>;
  }

  if (listError) console.log(listError);

  return (
    <div className={styles.container}>
      <HomeHeader />
      <div className={styles.tagPageWrapper}>
        <Link
          className={styles.selectedTags}
          to={'/tag/filter'}
          state={{ tags: tags }}
        >
          {tags.map((tag, tagIndex) => {
            return <TagChip key={tagIndex}>{tag}</TagChip>;
          })}
        </Link>
        <div className={styles.tagControll}>
          <div className={styles.tagSort} onClick={onSelectSort}>
            <div className={styles.dateSort}>
              {currentSort === 1 ? '오래된순' : '최신순'}
            </div>
            <div className={styles.chevronWrapper}>
              <TagDownChevron />
            </div>
          </div>
          <div className={styles.sortIcons}>
            <div className={styles.iconWrapper} onClick={toggleMode}>
              {isList ? <Card32 /> : <ListIcon />}
            </div>
            <Link
              className={styles.iconWrapper}
              to={'/tag/filter'}
              state={{ tags: tags }}
            >
              <TagFilter />
            </Link>
          </div>
        </div>
        {hasTag ? (
          isList ? (
            <List dataList={diaryList} />
          ) : (
            <CardView dataList={diaryList} />
          )
        ) : (
          <NoTagResult />
        )}
        {isSelectedSorted ? (
          <TagSortModal
            clickOuter={setIsSelectedSorted}
            isOpen={isSelectedSorted}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
        ) : null}
        <BottomNav page={1} />
      </div>
    </div>
  );
};

export default Tag;
