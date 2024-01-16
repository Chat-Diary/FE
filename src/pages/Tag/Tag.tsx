import React, { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import List from '../Home/List';
import { ListIcon, Card32 } from '../../assets/index';
import styles from './Tag.module.scss';
import CardView from './CardView';

const Tag = () => {
  const [isList, setIsList] = useState<boolean>(true);

  const toggleMode = () => {
    setIsList((prev) => !prev);
  };

  return (
    <div className={styles.tagPageWrapper}>
      <div className={styles.iconWrapper} onClick={toggleMode}>
        {isList ? <Card32 /> : <ListIcon />}
      </div>
      {isList ? <List /> : <CardView />}
      <BottomNav page={1} />
    </div>
  );
};

export default Tag;
