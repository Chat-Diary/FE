import React from 'react';
import styles from './NoTagResult.module.scss';

const NoTagResult = () => {
  return (
    <div className={styles.NoTagResultContainer}>
      <div className={styles.content1}>해당되는 일기가 없어요!</div>
      <div className={styles.content1}>태그를 변경해 보세요.</div>
    </div>
  );
};

export default NoTagResult;
