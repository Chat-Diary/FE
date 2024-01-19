import React, { useState, useEffect } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import List from '../Home/List';
import { ListIcon, Card32, DownChevron } from '../../assets/index';
import styles from './Tag.module.scss';
import CardView from './CardView';
import TagSortModal from '../../components/BottomSheets/TagSortModal';

const Tag = () => {
  const [isList, setIsList] = useState<boolean>(true);

  const toggleMode = () => {
    setIsList((prev) => !prev);
  };

  const [isSelectedSorted, setIsSelectedSorted] = useState(false);

  const onSelectSort = () => {
    setIsSelectedSorted(true);
  };
  
  useEffect(() => {
    if (isSelectedSorted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSelectedSorted]);

  return (
    <div className={styles.tagPageWrapper}>
      <div className={styles.dateSelector} onClick={onSelectSort}>
        <div className={styles.yearAndMonth}>
          최신순
        </div>
        <div className={styles.chevronWrapper}>
          <DownChevron />
        </div>
      </div>
      <div className={styles.iconWrapper} onClick={toggleMode}>
        {isList ? <Card32 /> : <ListIcon />}
      </div>
      {isList ? <List /> : <CardView />}
      {isSelectedSorted ? <TagSortModal clickOuter={setIsSelectedSorted} isOpen={isSelectedSorted}/> : null}
      <BottomNav page={1} />
    </div>
  );
};

export default Tag;