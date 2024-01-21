import React, { useState } from 'react';
import styles from './TagFilter.module.scss';
import AllTags from '../../components/Tags/AllTags';
import ChangeHeader from '../../components/Headers/ChangeHeader';
import ConfirmButton from '../../components/Buttons/ConfirmButton';
import { TagInit } from '../../assets';

const TagFilter = () => {
  const [isInit, setIsInit] = useState<boolean>(false);

  const toggleInit = () => {
    setIsInit(true);
  };

  const toggleConfirm = () => {
    console.log('적용하기');
  };

  return (
    <>
      <ChangeHeader>필터 선택</ChangeHeader>
      <AllTags isInit={isInit}></AllTags>
      <div className={styles.btnContainer}>
        <div className={styles.initBtn}>
          <div className={styles.icon}>
            <TagInit />
          </div>
          <button>초기화</button>
        </div>
        <div className={styles.confirmBtn}>
          <button>적용하기</button>
        </div>
      </div>
    </>
  );
};

export default TagFilter;
