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
import usePageStore from '../../stores/pageStore';
import { getTagPool } from '../../apis/tagApi';
import { TagType } from '../../components/Tag/AllTags/AllTags';
import { Diary } from '../../utils/diary';

const Tag = () => {
  // 현재 페이지 경로 및 list 여부 저장
  const getPage = usePageStore((state) => state.getPage);
  const setPage = usePageStore((state) => state.setPage);
  const prevTagType = getPage()[2];

  const { tags, diaryList, setTags, setDiaryList } = useTagStore();
  const [isList, setIsList] = useState<boolean>(prevTagType);
  const [currentSort, setCurrentSort] = useState<number>(2);
  const [tagPool, setTagPool] = useState<TagType[]>([]);

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
    queryKey: ['LIST', 'TAG', tags],
    queryFn: () => {
      if (tags.length !== 0) {
        return getDiaryListByTag(tags);
      }
    },
  });

  const { data: tagPoolData } = useQuery({
    queryKey: ['tag_pool'],
    queryFn: () => getTagPool(),
  });

  const randomSelectedTag = (sampleTags: TagType[]) => {
    const count = Math.floor(Math.random() * 3) + 1;
    const selectedItems = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * sampleTags.length);
      selectedItems.push(...sampleTags.splice(randomIndex, 1));
    }
    return selectedItems;
  };

  useEffect(() => {
    if (tagPoolData) {
      setTagPool(tagPoolData);
    }
  }, [tagPoolData]);

  useEffect(() => {
    if (tags.length === 0) {
      const randomTags: TagType[] = randomSelectedTag(tagPool);
      const tagNameList: string[] = randomTags.map((tag) => tag.tagName);
      setTags(tagNameList);
    }
  }, [tagPool]);

  useEffect(() => {
    setPage(location.pathname, false, isList);
  }, [isList]);

  useEffect(() => {
    if (diaryList) {
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
    if (diaryListData) {
      let sortedByLatest: Diary[] = [...diaryListData].sort((a, b) => {
        const dateA = new Date(a.diaryDate);
        const dateB = new Date(b.diaryDate);
        return +dateB - +dateA;
      });

      tags.forEach((selectedTag) => {
        sortedByLatest = sortedByLatest.map((diary) => ({
          ...diary,
          tagList: [
            ...diary.tagList.filter((tag) => tag.tagName === selectedTag),
            ...diary.tagList.filter((tag) => tag.tagName !== selectedTag),
          ],
        }));
      });
      setDiaryList(sortedByLatest);
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

  if (listError) console.log('Tag list error : ', listError);

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
            <List dataList={diaryList} isLoading={listLoading} />
          ) : (
            <CardView dataList={diaryList} isLoading={listLoading} />
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
